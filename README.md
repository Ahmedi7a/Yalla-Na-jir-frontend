# REACT JWT STARTER

## Cloning the Auth boilerplate

This lecture uses the [React JWT Auth Template](https://github.com/SEB-4-Bahrain/react-jwt-auth-template) as starter code. The template includes code to authenticate users in React using JWT tokens generated from an existing Express backend API.

Navigate to the `React JWT Auth Template` and clone the repository to your machine:

```bash
git clone https://github.com/SEB-4-Bahrain/react-jwt-auth-template.git <YOUR_APP_NAME> 
```

Next, `cd` into your renamed directory:xq

```bash
cd <YOUR_APP_NAME>
```

Finally, remove the existing `.git` information from this template:

```bash
rm -rf .git
```

> Removing the `.git` info is important as this is just a starter template provided by GA. You do not need the existing git history for this project.

## GitHub setup

To add this project to GitHub, initialize a new Git repository:

```bash
git init
git add .
git commit -m "init commit"
```

Make a new repository on [GitHub](https://github.com/) named `<YOUR_APP_NAME>`. 

Link your local project to your remote GitHub repo:

```bash
git remote add origin https://github.com/<github-username>/<YOUR_APP_NAME>.git
git push origin main
```

> 🚨 Do not copy the above command. It will not work. Your GitHub username will replace `<github-username>` and `<YOUR_APP_NAME>` (including the `<` and `>`) in the URL above.

Open the project's folder in your code editor:

```bash
code .
```

## Install dependencies

Next, you will want to install all of the packages listed in `package.json`

```bash
npm i
```

## Create a `.env`

Run the following command in your terminal:

```bash
touch .env
```

Lastly, we want to include a `VITE_EXPRESS_BACKEND_URL`.

Add the following secret key to your `.env`:

```text
VITE_EXPRESS_BACKEND_URL="http://localhost:3000"
```

## Update the `.gitignore`

Add `package-lock.json` and `.env` to the `.gitignore` file.  

```text
node_modules
package-lock.json
.env
```

## Start your application

Start the application with the following command:

```bash
npm run dev
```

Happy Coding!
