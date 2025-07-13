const Conversation = require("../models/Conversation");
const Message = require("../models/massagemodel"); // Consider renaming this file to messageModel.js
const {getreciverSoketId ,io}=require("../socket/socket")
// Send a message
const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;
   
if (!senderId || !receiverId) {
  return res.status(400).json({ error: "Both senderId and receiverId are required." });
}
    // Find existing conversation or create a new one
    let conversation = await Conversation.findOne({
      particepents: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        particepents: [senderId, receiverId],
        messages: [],
      });
    }

    // Create the message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    // Push message to conversation
    if (newMessage && conversation.messages) {
      conversation.messages.push(newMessage._id);
      await conversation.save();
      await newMessage.save()
    }
    // socket io

    const receiversoketId= getreciverSoketId(receiverId);
   
    
    if(receiversoketId){
      io.to(receiversoketId).emit("newMessage",newMessage)
    }

    return res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to send message" });
  }
};

// Get all messages with a user
const getMessages = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
 console.log("Sender ID:", senderId);
console.log("Receiver ID:", receiverId);
    let conversation = await Conversation.findOne({
      particepents: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      await Conversation.create({
        particepents: [senderId, receiverId],
        messages: [],
      });

      return res.status(200).json([]);
    }

    return res.status(200).json(conversation.messages || []);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to get messages" });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
