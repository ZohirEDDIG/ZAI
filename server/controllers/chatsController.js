import User from '../models/User.js';
import Chat from '../models/Chat.js';

export const getChats = async ( req, res ) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not foud' });

    const chats = await Chat.find({ user: id }).sort({ updatedAt: -1 });

    return res.status(200).json({ chats });

  } catch (error) {
    console.error('Failed to load chats: ', error.message);
    return res.status(500).json({ error: 'Failed to load chats' });
  }
} 