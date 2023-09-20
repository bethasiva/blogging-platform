

# Hi, I'm Siva! 👋

## 🚀 About Me
I'm a full stack developer...


## Contact

For contact, email bethasiva7780@gmail.com


## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file.Create `.env` file in the root directory only.

`NOTE:To make your life easier, all ENV variables are provided below.`

`MONGODB_URL="mongodb+srv://siva1234:siva1234@bloggingsite.ku3ehjl.mongodb.net/blogging_site"`

`PORT=3000`

`JWT_SECRET_KEY="FdAzOiMhMRNR4kbCqOm8XW52kFAbXVB3"`

`JWT_EXPIRE="5d"`


## Run Locally

Clone the project

```bash
  git clone https://github.com/bethasiva/blogging-platform.git
```

Go to the project directory

```bash
  cd blogging-platform
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


# API Reference

## Auth API Reference
#### Sign up

```http
  POST /api/auth/signup
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username, email` and ` password`      | `string` | **Required**. username, email and password |

#### Sign in

```http
  POST /api/auth/signin
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` and ` password`      | `string` | **Required**. email and password |

#### Log out

```http
  GET /api/auth/logout
```

## Blog Api Reference

#### Get all Blog posts

```http
  GET /api/blogPosts
```

#### Get all Blog posts of the author

```http
  GET /api/blogPosts/authorBlogPosts
```


#### Get Blog post by blog post ID

```http
  GET /api/blogPosts/blogPost/${_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `_id`      | `string` | **Required**. Id of blog post to fetch |




#### Create a Blog post 

```http
  POST /api/blogPosts/createBlogPost
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` and `content`      | `string` | **Required**. title and content |



#### Update a Blog post 

```http
  POST /api/blogPosts/blogPost/${_id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `_id`      | `string` | **Required**. Id of blog post to update |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` or `content`      | `string` | **Required**. title or content |

#### Delete a Blog post 

```http
  GET /api/blogPosts/blogPost/${_id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `_id`      | `string` | **Required**. Id of blog post to delete |


