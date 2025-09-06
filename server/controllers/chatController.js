import User from '../models/User.js';
import Chat from '../models/Chat.js';

export const saveChat = async (req, res) => {
  try {
    const { id } = req.user;
    const chat  = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if(!chat.title || chat.chat.length === 0) {
      return res.status(400).json({ error: 'Title and chat content are required' });
    }

    const newChat = new Chat({
      user: id,
      title: chat.title,
      chat: chat.chat,
    });

    await newChat.save();

    return res.status(200).json({ message: 'Chat saved successfully', chatId: newChat._id });
  } catch (error) {
    console.error('Failed to save chat: ', error.message);
    return res.status(500).json({ error: 'Failed to save chat' });
  }
};


export const updateChat = async (req, res) => {
  try {
    const { id } = req.user;
    const { chatId } = req.params;
    const { newMessages } = req.body;


    const user = await User.findById( id );
    if (!user) return res.status(404).json({ error: 'User not found' });

    const chat = await Chat.findById( chatId );
    if (!chat) return res.status(404).json({ error: 'Chat not found' });

    if(newMessages.length === 0) {
      return res.status(400).json({ error: 'New messages are required' });
    }

    chat.chat.push(...newMessages);

    await chat.save();

    return res.status(200).json({ message: 'Chat updated successfully' });
  } catch (error) {
    console.error('Failed to update chat: ', error.message);
    return res.status(500).json({ error: 'Failed to update chat' });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const { id } = req.user; 
    const { chatId } = req.params;

    const chat = await Chat.findOneAndDelete({ _id: chatId,  user: id });

    if (!chat) {
      return res.status(400).json({ error: 'Chat not found or not authorized' });
    }

    return res.status(200).json({ message: 'Chat deleted successfully' });

  } catch (error) {
    console.error('Failed to delete chat: ', error.message);
    return res.status(500).json({ error: 'Failed to delete chat' });
  }
}

export const renameChat = async (req, res) => {
  try {
    const { id } = req.user; 
    const { chatId } = req.params;
    const { newTitle } = req.body;

    const chat = await Chat.findOneAndUpdate({ _id: chatId,  user: id }, { title: newTitle });

    if (!chat) {
      return res.status(400).json({ error: 'Chat not found or not authorized' });
    }

    return res.status(200).json({ message: 'Chat renamed successfully' });

  } catch (error) {
    console.error('Failed to rename chat: ', error.message);
    return res.status(500).json({ error: 'Failed to rename chat' });
  }
}