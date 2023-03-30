import { Time } from "@angular/common";

export interface Post{
  _id: string,
  title: string,
  content: string,
  image: string,
  owner: {
    _id: string,
    username: string,
    email: string,
  },
  created_at: string,
  updated_at: string,
  is_deleted: false
}

// {
//   "_id": "64215bce8a5256db02692823",
//   "title": "Post 5",
//   "content": "This is post 5",
//   "owner": {
//       "_id": "64215a23b54412d28d399926",
//       "username": "test",
//       "email": "test@gmail.com"
//   },
//   "created_at": "2023-03-27T09:03:10.454Z",
//   "updated_at": "0001-01-01T00:00:00Z",
//   "is_deleted": false
// },
