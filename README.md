# API Endpoints

## Account

- **Sign Up**  
  `POST {{localhost}}/api/users/signup/`

- **Login**  
  `POST {{server}}/api/auth/login/`

- **Change Password**  
  `PUT {{localhost}}/api/users/change-password/`

- **Get Profile**  
  `GET {{localhost}}/api/users/me/`

- **Update Profile**  
  `PUT {{localhost}}/api/users/me/`

---

## Todos

- **Get Todos**  
  `GET {{server}}/api/todos/`

- **Create Todo**  
  `POST {{localhost}}/api/todos/`

- **Update Todo**  
  `PUT {{localhost}}/api/todos/3/` *(example with ID 3)*

- **Delete Todo**  
  `DELETE {{localhost}}/api/todos/4/` *(example with ID 4)*



## Color Variables

Some colors are **from Figma**, others are chosen randomly for the project:

```css
:root {
  --color-primary: #5272ff;       
  --color-gray: #8CA3CD;          
  --color-green: #11c25d;         
  --color-red: #ee0039;           
  --color-black: #1e1e1e;         
  --color-white: #ffffff;         
  --color-light: #eef7ff;         
  --color-dark: #0d224a;          
  --color-dark-gray: #4B5563;     
  --color-input-border: #D1D5DB;  
}


Before Deploy --

npm run type-check
npm run lint
