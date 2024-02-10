const Data = require("../models/Data")
const User = require("../models/User")
const Tag = require("../models/Tag")

//Fetch all data main screen
module.exports.fetchAllData = async (req, res) => {
    const data = await Data.find({})
    res.status(201).json(data)
}

//Fetch All Data w.r.t a user
module.exports.fetchAllDataUser = async (req, res) => {
    const { id } = req.user
    console.log(req.user);
    console.log(id);
    const data = await Data.find({ user: id })
    res.status(201).json(data)
}


// Logged in user can add a data
module.exports.addData = async (req, res) => {
    try {
      const { title, description, tag} = req.body; // Assuming you have these values in the request body
      const userId = req.user.id;
      // Create a new data post object
    //   console.log(req.user);


      const user = await User.findById(userId);
      console.log(user);

      const newDataPost = new Data({
        title,
        description,
        tag : tag,
        user: userId, // User ObjectId who created the data post
        username : user.username,
      });


  
      // Save the new data post
      console.log(newDataPost);
      await newDataPost.save();

      for (const tagText of tag) {
        const existingTag = await Tag.findOne({ categoryName: tagText });
  
        if (existingTag) {
          // If the tag already exists, associate the blog with it
          existingTag.category.push(newDataPost.id);
          await existingTag.save();
        } else {
          // If the tag doesn't exist, create a new one and associate the data with it
          const newTag = new Tag({ categoryName: tagText, category: [newDataPost.id] });
          await newTag.save();
        }
      }
  
      res.status(201).json({ message: 'Data added successfully' });
    } catch (error) {
      console.error('Error adding data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };



//To update a data (Send data id in req and auth token (to get the user id))


module.exports.updateData = async (req, res) => {
  try {
    console.log("I am here");
    const userId = req.user.id;
    const dataId = req.params.id;

    // Find the blog post by its ObjectId
    const data = await Data.findById(dataId);

    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }

    // Check if the user owns the blog post
    if (data.user.toString() !== userId) {
      return res.status(403).json({ message: 'You do not have permission to update this data' });
    }

    // Update the blog post fields
    if (req.body.title) {
      data.title = req.body.title;
    }
    if (req.body.description) {
      data.description = req.body.description;
    }


    // Remove existing tags
    if(req.body.tag){
        const earlierTags = data.tag;
        for (const tagText of earlierTags) {
          const existingTag = await Tag.findOne({ categoryName: tagText });
          if (existingTag) {
              existingTag.category.pull(dataId); // Remove the dataId from the category array
              if (existingTag.category.length === 0) {
                  // If the category array is empty, delete the tag
                  await Tag.deleteOne({ _id: existingTag._id });
              } else {
                  // If the category array is not empty, save the updated tag
                  await existingTag.save();
              }
          }
        }

        // Add new tags
        for (const tagText of req.body.tag || []) {
          const existingTag = await Tag.findOne({ categoryName: tagText });
            if (existingTag) {
                existingTag.category.push(dataId);
                await existingTag.save();
            } else {
                const newTag = new Tag({ categoryName: tagText, category: [dataId] });
                await newTag.save();
            }
        }

        data.tag = req.body.tag;
    }
    // Use findByIdAndUpdate to update the data
    await Data.findByIdAndUpdate(dataId, data);
    
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



//To delete a data (Send Data id in req and auth token (to get the user id))
module.exports.deleteData = async (req, res) => {
    try {
      const userId = req.user.id; // Include blogId and userId in the request body
      const dataId = req.params.id;
      // Find the blog post by its ObjectId
      const data = await Data.findById(dataId);
  
      if (!data) {
        return res.status(404).json({ message: 'Data not found' });
      }
  
      // Check if the user owns the data
      if (data.user.toString() !== userId) {
        return res.status(403).json({ message: 'You do not have permission to delete this data' });
      }
  
      // Delete the data
      
      if(data.tag){
        const earlierTags = data.tag;
        for (const tagText of earlierTags) {
            const existingTag = await Tag.findOne({ categoryName: tagText });
            if (existingTag) {
                existingTag.category.pull(dataId); // Remove the dataId from the category array
                if (existingTag.category.length === 0) {
                    // If the category array is empty, delete the tag
                    await Tag.deleteOne({ _id: existingTag._id });
                } else {
                    // If the category array is not empty, save the updated tag
                    await existingTag.save();
                }
            }
        }
      }    

      await Data.findByIdAndDelete(dataId);
      res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  