// Auth Context //
export type AuthUserType = {
  id: string;
  username: string;
  fullname: string;
  gender: "" | "male" | "female" | "other";
  profile_picture: string;
  created_at: string;
  last_signed_in: string;
  updated_at: null | string;
};

// Zustand //
export type ConversationType = {
  conversation_id: string;
  user_id: string;
  username: string;
  fullname: string;
  profile_picture: string;
};

export type MessageType = {
  id: string;
  conversation_id: string;
  sender_id: string;
  message: string;
  created_at: string;
  shouldShake?: boolean;
};

// Signup //
export type SignupInputsType = {
  username: string;
  fullname: string;
  password: string;
  passwordConfirmation: string;
  gender: "" | "male" | "female" | "other";
};

// Login //
export type LoginInputsType = {
  username: string;
  password: string;
};

// Profile //
export type ProfileInputsType = {
  username: string;
  fullname: string;
  gender: "" | "male" | "female" | "other";
};

// Change Password //
export type ChangePasswordInputsType = {
  password: string;
  newPassword: string;
  newPasswordConfirmation: string;
};

// // Users //
// export type UserConversationType = {
//   conversation_id: string | NULL;
//   user_id: string;
//   username: string;
//   fullname: string;
//   profile_picture: string;
// };
