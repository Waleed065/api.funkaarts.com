export type messageSchema = {
    _id: string;
    chatRoomId: string;
    type: string;
    from: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  };
  