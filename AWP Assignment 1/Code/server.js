import { createServer } from "http";
import { readFile } from "fs";
import { createConnection } from "mysql";
import { parse } from "url";

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "assignment1",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to database:", err);
    process.exit(1);
  }
  console.log("Connected to database");
});

function sendFile(res, path) {
  res.setHeader("Content-Type", "text/html");
  readFile(path, (err, data) => {
    if (err) {
      sendMessageFile(res, "Error reading file", 500);
    } else {
      res.statusCode = 200;
      res.end(data);
    }
  });
}

function sendMessageFile(res, message, statusCode) {
  res.setHeader("Content-Type", "text/html");
  readFile("./message.html", (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("Error reading file");
    } else {
      res.statusCode = statusCode;
      const messageData = data
        .toString()
        .replace(/{{status}}/g, statusCode)
        .replace(/{{message}}/g, message);
      res.end(messageData);
    }
  });
}

function sendHomePage(res, user) {
  res.setHeader("Content-Type", "text/html");
  readFile("./homepage.html", (err, data) => {
    if (err) {
      sendMessageFile(res, "Error reading file", 500);
    } else {
      res.statusCode = 200;
      const homepageData = data
        .toString()
        .replace(/{{FirstName}}/g, user.FirstName)
        .replace(/{{LastName}}/g, user.LastName)
        .replace(/{{EmailAddress}}/g, user.EmailAddress);
      res.end(homepageData);
    }
  });
}

const server = createServer((req, res) => {
  const { pathname } = parse(req.url);

  if (pathname === "/" || pathname === "/MyWebApplication") {
    sendFile(res, "./index.html");
  } else if (pathname === "/MyWebApplication/signup") {
    if (req.method === "GET") {
      sendFile(res, "./signup.html");
    } else if (
      req.method === "POST" &&
      req.headers["content-type"] === "application/x-www-form-urlencoded"
    ) {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString(); // convert Buffer to string
      });
      req.on("end", () => {
        const formData = new URLSearchParams(body);
        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        let query = `SELECT * FROM users WHERE EmailAddress = '${email}'`;

        connection.query(query, (err, rows) => {
          if (err) {
            console.log("Error retrieving user from database:", err);
            sendMessageFile(res, "Error retrieving user from database", 500);
          } else {
            if (password !== confirmPassword) {
              sendMessageFile(res, "Passwords do not match", 400);
            } else if (rows.length > 0) {
              sendMessageFile(res, "User already exists", 409);
            } else if (rows.length === 0) {
              query = `INSERT INTO users (FirstName, LastName, EmailAddress, Password) VALUES 
                      ('${firstname}', '${lastname}', '${email}', '${password}')`;

              connection.query(query, (err) => {
                if (err) {
                  console.log("Error saving user to database:", err);
                  sendMessageFile(res, "Error saving user to database", 500);
                } else {
                  const user = {
                    FirstName: firstname,
                    LastName: lastname,
                    EmailAddress: email,
                  };
                  sendHomePage(res, user);
                }
              });
            }
          }
        });
      });
    }
  } else if (pathname === "/MyWebApplication/signin") {
    if (req.method === "GET") {
      res.setHeader("Content-Type", "text/html");
      readFile("./signin.html", (err, data) => {
        if (err) {
          sendMessageFile(res, "Error reading file", 500);
        } else {
          res.statusCode = 200;
          res.end(data);
        }
      });
    } else if (
      req.method === "POST" &&
      req.headers["content-type"] === "application/x-www-form-urlencoded"
    ) {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString(); // convert Buffer to string
      });

      req.on("end", () => {
        const formData = new URLSearchParams(body);
        const email = formData.get("email");
        const password = formData.get("password");

        const query = `SELECT * FROM users WHERE EmailAddress = '${email}' AND Password = '${password}'`;

        connection.query(query, (err, rows) => {
          if (err) {
            console.log("Error retrieving user from database:", err);
            sendMessageFile(res, "Error retrieving user from database", 500);
          } else {
            if (rows.length === 0) {
              sendMessageFile(res, "Invalid username or password", 401);
            } else {
              const { FirstName, LastName, EmailAddress } = rows[0];
              sendHomePage(res, { FirstName, LastName, EmailAddress });
            }
          }
        });
      });
    }
  } else {
    sendMessageFile(res, "Page not found", 404);
  }
});

server.listen(8080, () => {
  console.log("Server listening on http://localhost:8080");
});
