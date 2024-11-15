from flask import Flask, request, jsonify, redirect, render_template
import bcrypt
import json
import os

app = Flask(__name__)

# Load existing users
def load_users():
    if os.path.exists("passwords.json"):
        with open("passwords.json", "r") as file:
            return json.load(file)
    return {}

# Save users to JSON
def save_users(users):
    with open("passwords.json", "w") as file:
        json.dump(users, file)

# Sign Up Route
@app.route('/signup', methods=['POST'])
def signup():
    username = request.form['username']
    password = request.form['password']
    users = load_users()

    if username in users:
        return "Username already exists", 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    users[username] = hashed_password.decode('utf-8')
    save_users(users)
    return "User registered successfully", 200

# Login Route
@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    users = load_users()

    if username not in users:
        return "User not found", 400

    stored_password = users[username].encode('utf-8')
    if bcrypt.checkpw(password.encode('utf-8'), stored_password):
        return "Login successful", 200
    else:
        return "Incorrect password", 400

if __name__ == '__main__':
    app.run(debug=True)
