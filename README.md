# AWS Web-Hosted Cloud Music Subscription Application

Welcome to the AWS Web-Hosted Cloud Music Subscription Application! This project is a cloud-based web application that allows users to register, log in, query a music database, subscribe to songs, and manage their subscriptions. The application leverages various AWS services such as EC2, S3, DynamoDB, API Gateway, and Lambda functions.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [AWS Services Used](#aws-services-used)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Code Explanation](#code-explanation)
  - [Task 1: DynamoDB Setup](#task-1-dynamodb-setup)
  - [Task 2: S3 Setup](#task-2-s3-setup)
  - [Task 3: Login Page](#task-3-login-page)
  - [Task 4: Register Page](#task-4-register-page)
  - [Task 5: Main Page](#task-5-main-page)
  - [Task 6: API Gateway and Lambda Functions](#task-6-api-gateway-and-lambda-functions)
- [Security Considerations](#security-considerations)
- [Acknowledgements](#acknowledgements)

---

## Project Overview

This project is developed as part of a larger project to create a cloud-based music subscription application using AWS services. The application is fully hosted on an AWS EC2 instance running Ubuntu Server and is accessible via a web browser using the EC2 instance's public DNS.

The application allows users to:

- Register and log in.
- Query a music database.
- Subscribe to songs.
- Manage their subscriptions.
- Securely access artist images stored in S3.

---

## Features

- **User Authentication:**
  - Secure user registration and login system.
  - Passwords are stored securely in DynamoDB.

- **Music Database Querying:**
  - Users can search for songs by title, artist, and year.
  - Displays query results with song information and artist images.

- **Subscription Management:**
  - Users can subscribe to songs from the query results.
  - Subscribed songs are displayed in the user's subscription area.
  - Users can remove subscriptions.

- **AWS Integration:**
  - Uses DynamoDB for data storage.
  - Stores artist images in S3 and generates presigned URLs.
  - API Gateway and Lambda functions handle registration and subscription actions.

- **Responsive Web Design:**
  - User-friendly interfaces built with HTML and Bootstrap.
  - Consistent styling and animations for better user experience.

---

## Architecture

![detailed_aws_architecture_diagram_2](https://github.com/user-attachments/assets/3845ddf8-17c8-41d0-a880-b8dea252ac5a)


The application architecture consists of:

- **AWS EC2 Instance:**
  - Hosts the Flask web application.
  - Serves HTML templates and handles user requests.

- **Flask Application Components:**
  - `login.py`: Handles user authentication.
  - `register.py`: Manages user registration via API Gateway.
  - `main.py`: Contains the main application logic.
  - HTML Templates: `login.html`, `register.html`, `main.html`, `query.html`.

- **AWS DynamoDB:**
  - `login` table: Stores user credentials.
  - `music` table: Contains music data.
  - `subscription` table: Tracks user subscriptions.

- **AWS S3 Bucket:**
  - Stores artist images.
  - Images are accessed via presigned URLs for security.

- **AWS API Gateway and Lambda Functions:**
  - API Gateway exposes REST API endpoints.
  - Lambda functions handle user registration and subscription management.

---

## AWS Services Used

- **EC2 (Elastic Compute Cloud):** Hosts the web application on an Ubuntu Server instance.
- **S3 (Simple Storage Service):** Stores artist images securely.
- **DynamoDB:** NoSQL database service used to store user, music, and subscription data.
- **API Gateway:** Exposes REST API endpoints for interacting with Lambda functions.
- **Lambda Functions:** Executes backend logic for user registration and subscription management.
- **IAM (Identity and Access Management):** Manages roles and permissions for AWS services.
- **Boto3:** AWS SDK for Python used to interact with AWS services programmatically.

---

## Prerequisites

- **AWS Account:** You need an AWS account with access to the AWS Management Console.
- **AWS CLI:** Installed and configured with your AWS credentials.
- **Python 3.x:** Installed on your local machine or EC2 instance.
- **Flask:** Python web framework used for the application.
- **Boto3:** AWS SDK for Python.
- **An EC2 Instance:** Ubuntu Server 20.04 LTS recommended.

---

## Installation and Setup

### 1. Launch an EC2 Instance

- Launch an Ubuntu Server 20.04 LTS EC2 instance.
- Configure security groups to allow inbound traffic on ports 80 (HTTP) and 443 (HTTPS).
- Associate an IAM role with necessary permissions for DynamoDB, S3, API Gateway, and Lambda.

### 2. Connect to the EC2 Instance

- Use SSH to connect to your EC2 instance.

  ```bash
  ssh -i /path/to/your/key.pem ubuntu@your-ec2-public-dns
  ```

### 3. Install Required Packages

- Update the package lists:

  ```bash
  sudo apt update
  ```

- Install Python 3 and pip:

  ```bash
  sudo apt install python3 python3-pip -y
  ```

- Install Flask and Boto3:

  ```bash
  pip3 install flask boto3 requests
  ```

- Install Apache2 web server:

  ```bash
  sudo apt install apache2 libapache2-mod-wsgi-py3 -y
  ```

### 4. Clone the Repository

- Clone your project repository to the EC2 instance.

  ```bash
  git clone https://github.com/reyiyama/aws-cloud-music-app.git
  ```

- Navigate to the project directory:

  ```bash
  cd aws-cloud-music-app
  ```

### 5. Configure AWS Credentials

- Since the EC2 instance has an IAM role attached, AWS services can be accessed without explicit credentials.

### 6. Set Up the Application

- **Task 1:** Run `task1.py` to set up DynamoDB tables and load data.

  ```bash
  python3 task1.py
  ```

- **Task 2:** Run `task2.py` to download artist images and upload them to S3.

  ```bash
  python3 task2.py
  ```

- **Configure Apache2:**

  - Create a new Apache2 configuration file for the Flask application.

    ```bash
    sudo nano /etc/apache2/sites-available/your-app.conf
    ```

  - Add the following configuration:

    ```apache
    <VirtualHost *:80>
        ServerName your-ec2-public-dns

        WSGIDaemonProcess your-app threads=5
        WSGIScriptAlias / /path/to/your/app/wsgi.py

        <Directory /path/to/your/app>
            WSGIProcessGroup your-app
            WSGIApplicationGroup %{GLOBAL}
            Require all granted
        </Directory>

        Alias /static /path/to/your/app/static
        <Directory /path/to/your/app/static>
            Require all granted
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/your-app-error.log
        CustomLog ${APACHE_LOG_DIR}/your-app-access.log combined
    </VirtualHost>
    ```

  - Enable the site and restart Apache2:

    ```bash
    sudo a2ensite your-app
    sudo systemctl restart apache2
    ```

---

## Usage

- Access the application by entering your EC2 instance's public DNS in your web browser.

  ```
  http://your-ec2-public-dns
  ```

- **Register a New User:**

  - Click on the "Register" link on the login page.
  - Fill in the email, username, and password fields.
  - If the email is unique, the account will be created, and you'll be redirected to the login page.

- **Login:**

  - Enter your email and password on the login page.
  - If the credentials are valid, you'll be redirected to the main page.

- **Main Page Features:**

  - **User Area:** Displays your username.
  - **Subscription Area:** Shows your subscribed songs with artist images.
    - Click "Remove" to unsubscribe from a song.
  - **Query Area:** Search for songs by title, artist, or year.
    - Click "Query" to display matching songs.
    - Click "Subscribe" to add a song to your subscriptions.

- **Logout:**

  - Click the "Logout" link to end your session and return to the login page.

---

## Code Explanation

### Task 1: DynamoDB Setup

- **`task1.py`**

  - **Purpose:** Automates the creation of DynamoDB tables (`login`, `music`, `subscription`) and loads initial data.
  - **Login Table:**
    - Contains 10 predefined user accounts.
    - Attributes: `email`, `user_name`, `password`.
  - **Music Table:**
    - Stores music records from `a1.json`.
    - Attributes: `title`, `artist`, `year`, `web_url`, `image_url`.
  - **Subscription Table:**
    - Tracks user subscriptions.
    - Attributes: `email`, `title`, `artist`.

- **Key Functions:**

  - **Creating Tables:**
    - Uses `dynamodb.create_table()` with appropriate `KeySchema` and `AttributeDefinitions`.
    - Waits for table creation using `table.meta.client.get_waiter('table_exists').wait()`.

  - **Loading Data:**
    - Reads data from `a1.json`.
    - Uses `batch_writer()` to efficiently write multiple items.

### Task 2: S3 Setup

- **`task2.py`**

  - **Purpose:** Downloads artist images and uploads them to an S3 bucket.
  - **S3 Bucket:**
    - Bucket name: `music-app-images`.
    - Stores images with filenames as `<ArtistName>.jpg`.

- **Key Functions:**

  - **Downloading Images:**
    - Parses `image_url` from each song in `a1.json`.
    - Uses `requests.get()` to download image data.

  - **Uploading to S3:**
    - Uses `s3.put_object()` to upload images to the S3 bucket.

### Task 3: Login Page

- **`login.py`**

  - **Purpose:** Handles user authentication.
  - **Route:** `/login`
  - **Methods:** `GET`, `POST`

- **Functionality:**

  - **Login Form:**
    - Collects `email` and `password`.
  - **Authentication:**
    - Retrieves user data from the `login` table.
    - Checks if the provided password matches.
    - Stores user session data on successful login.
    - Displays error message on failure.

- **Template:** `login.html`

  - Styled with Bootstrap.
  - Includes form fields for email and password.
  - Displays flash messages for feedback.

### Task 4: Register Page

- **`register.py`**

  - **Purpose:** Manages user registration via API Gateway and Lambda function.
  - **Route:** `/register`
  - **Methods:** `GET`, `POST`

- **Functionality:**

  - **Registration Form:**
    - Collects `email`, `username`, and `password`.
  - **Email Validation:**
    - Checks if the email already exists in the `login` table.
    - Displays error message if the email is taken.
  - **API Integration:**
    - Sends a POST request to the API Gateway endpoint to invoke the Lambda function for user registration.
  - **Success Handling:**
    - Redirects to the login page with a success message.

- **Template:** `register.html`

  - Styled with Bootstrap.
  - Includes form fields for email, username, and password.
  - Displays flash messages for feedback.

### Task 5: Main Page

The `main.py` file is central to the application's functionality, handling user interactions after login, including querying songs, managing subscriptions, and displaying user information. There are three versions of `main.py` provided:

1. **`main_without_images.py`**
2. **`main.py`**
3. **`main2.py`**

Each version builds upon the previous one, adding more features and integrating additional AWS services.

---

#### Common Functionality Across All Versions

- **User Session Management:**
  - Ensures the user is logged in before accessing main features.
  - Redirects unauthenticated users to the login page.

- **Subscription Area:**
  - Retrieves user subscriptions from the `subscription` table in DynamoDB.
  - Displays subscriptions with song details.
  - Allows users to remove subscriptions via the `/unsubscribe` route.

- **Query Area:**
  - Allows users to search for songs by title, artist, and year.
  - Builds a filter expression based on provided criteria.
  - Retrieves matching songs from the `music` table in DynamoDB.
  - Displays query results with an option to subscribe.

- **Subscription Management:**
  - **Subscribe:**
    - Adds a new subscription to the `subscription` table.
  - **Unsubscribe:**
    - Removes the subscription from the `subscription` table.

- **Logout:**
  - Clears the user session and redirects to the login page.

---

#### Version Differences

##### **1. `main_without_images.py`**

- **Purpose:**
  - A basic version that implements core functionalities without integrating AWS S3 for artist images.
  - Subscription management is handled directly within the application code, interacting with DynamoDB.

- **Key Characteristics:**
  - **No S3 Integration:**
    - Does not retrieve artist images from S3.
    - Subscriptions and query results display song details without images.
  - **Direct DynamoDB Interaction:**
    - The application directly interacts with DynamoDB for subscription management.
    - No use of AWS API Gateway or Lambda functions.
  - **Simplified Imports:**
    - Does not import the `requests` library since there's no need to make HTTP requests to external APIs.

- **Code Highlights:**

  - **Imports:**

    ```python
    import boto3
    ```

  - **Subscription Management:**

    ```python
    @app.route('/subscribe', methods=['POST'])
    def subscribe():
        # Directly adds the subscription to DynamoDB
    ```

    ```python
    @app.route('/unsubscribe', methods=['POST'])
    def unsubscribe():
        # Directly removes the subscription from DynamoDB
    ```

- **Use Case:**
  - Suitable for environments where AWS Lambda and API Gateway are not utilized.
  - Focuses on core functionality without additional AWS services.

---

##### **2. `main.py`**

- **Purpose:**
  - Enhances the basic version by integrating AWS S3 to retrieve and display artist images.
  - Subscription management is still handled directly within the application code.

- **Key Characteristics:**
  - **S3 Integration:**
    - Retrieves artist images from S3.
    - Generates presigned URLs for secure access to images.
    - Displays images alongside song details in subscriptions and query results.
  - **Direct DynamoDB Interaction:**
    - Continues to interact directly with DynamoDB for subscription management.
    - Does not use AWS API Gateway or Lambda functions for this purpose.
  - **Additional Imports:**
    - Imports the `requests` library (though not used in this version, possibly for future API interactions).

- **Code Highlights:**

  - **Imports:**

    ```python
    import requests
    import boto3
    ```

  - **S3 Setup:**

    ```python
    s3 = boto3.client('s3')
    bucket_name = 'music-app-images'
    ```

  - **Retrieving Images in `/main` Route:**

    ```python
    for subscription in subscriptions:
        artist = subscription['artist']
        image_name = f"{artist}.jpg"
        image_url = s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': bucket_name, 'Key': image_name},
            ExpiresIn=3600
        )
        subscription['image_url'] = image_url
    ```

  - **Retrieving Images in `/query` Route:**

    ```python
    for result in query_results:
        artist = result['artist']
        image_name = f"{artist}.jpg"
        image_url = s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': bucket_name, 'Key': image_name},
            ExpiresIn=3600
        )
        result['image_url'] = image_url
    ```

  - **Subscription Management:**

    ```python
    @app.route('/subscribe', methods=['POST'])
    def subscribe():
        # Directly adds the subscription to DynamoDB
    ```

    ```python
    @app.route('/unsubscribe', methods=['POST'])
    def unsubscribe():
        # Directly removes the subscription from DynamoDB
    ```

- **Use Case:**
  - Ideal when you want to include artist images to enhance user experience.
  - Does not require the setup of AWS API Gateway and Lambda functions for subscription management.

---

##### **3. `main2.py`**

- **Purpose:**
  - Integrates AWS API Gateway and Lambda functions for subscription management.
  - Retains S3 integration for artist images.
  - Represents a more advanced version aligning with AWS best practices for serverless architecture.

- **Key Characteristics:**
  - **S3 Integration:**
    - Same as in `main.py`, retrieves and displays artist images using presigned URLs.
  - **API Gateway and Lambda Integration:**
    - Subscription management is handled via HTTP requests to API Gateway endpoints.
    - The application invokes Lambda functions to interact with DynamoDB.
    - Utilizes the `requests` library to make API calls.
  - **Commented Out Code:**
    - Contains commented-out sections where direct DynamoDB interactions are replaced with API calls.

- **Code Highlights:**

  - **Imports:**

    ```python
    import requests
    import boto3
    ```

  - **API Base URL:**

    ```python
    API_BASE_URL = 'https://{api-id}.execute-api.{region}.amazonaws.com/{stage}'
    ```

  - **S3 Setup:**

    ```python
    s3 = boto3.client('s3')
    bucket_name = 'music-app-images'
    ```

  - **Subscription Management via API:**

    - **Subscribe:**

      ```python
      @app.route('/subscribe', methods=['POST'])
      def subscribe():
          email = session['email']
          title = request.form['title']
          artist = request.form['artist']
          
          subscription_data = {
              'email': email,
              'title': title,
              'artist': artist
          }
          
          response = requests.post(f'{API_BASE_URL}/subscriptions', json=subscription_data)
          
          if response.status_code == 201:
              flash('Subscription added successfully!', 'success')
          else:
              flash('Failed to add subscription. Please try again.', 'error')
          
          return redirect(url_for('main'))
      ```

    - **Unsubscribe:**

      ```python
      @app.route('/unsubscribe', methods=['POST'])
      def unsubscribe():
          email = session['email']
          title = request.form['title']
          
          response = requests.delete(f'{API_BASE_URL}/unsubscribe', params={
              'email': email,
              'title': title
          })
          
          if response.status_code == 200:
              flash('Subscription removed successfully!', 'info')
          else:
              flash('Failed to remove subscription. Please try again.', 'error')
          
          return redirect(url_for('main'))
      ```

    - **Commented Out Code:**
      - Shows previous direct interactions with DynamoDB, serving as a reference.

  - **S3 Image Retrieval:**
    - Same as in `main.py`.

- **Use Case:**
  - Suitable for applications that aim to follow a microservices architecture.
  - Enhances scalability and maintainability by decoupling the frontend from direct database interactions.
  - Ideal for implementing advanced AWS services like API Gateway and Lambda.

---

#### Summary of main.py main_without_images.py and main2.py Differences

| Feature                            | `main_without_images.py` | `main.py`                | `main2.py`                       |
|------------------------------------|--------------------------|--------------------------|----------------------------------|
| S3 Image Retrieval                 | No                       | Yes                      | Yes                              |
| Subscription Management            | Direct DynamoDB          | Direct DynamoDB          | Via API Gateway & Lambda         |
| API Gateway and Lambda Integration | No                       | No                       | Yes                              |
| Imports `requests` Library         | No                       | Yes (unused)             | Yes (used for API calls)         |
| Commented Out Code                 | No                       | No                       | Yes (shows previous implementation) |

---

#### Templates

- **`main.html`**
  - Displays user subscriptions and query results.
  - Includes forms to subscribe or unsubscribe from songs.
  - When S3 integration is present, it displays artist images alongside song details.

- **`query.html`**
  - Provides a form to input query criteria (title, artist, year).
  - Submits the form to the `/query` route for processing.

---

#### Choosing the Appropriate Version

- **Use `main_without_images.py` if:**
  - You want a simple application without the need for artist images.
  - You prefer direct interaction with DynamoDB for subscription management.
  - You are not integrating AWS API Gateway and Lambda functions.

- **Use `main.py` if:**
  - You want to enhance the user experience by displaying artist images.
  - You are comfortable with direct DynamoDB interactions for subscription management.
  - You do not require API Gateway and Lambda integration.

- **Use `main2.py` if:**
  - You aim to implement a microservices architecture with AWS services.
  - You want to decouple the application logic by using API Gateway and Lambda functions.
  - You desire both S3 image retrieval and advanced AWS integrations.

---

#### Summarized main.py permutations explanation

Each version of `main.py` builds upon the previous one, progressively adding more AWS services and functionalities:

1. **`main_without_images.py`** provides the core functionalities without image retrieval or advanced AWS services.
2. **`main.py`** adds S3 integration to retrieve and display artist images, enhancing the user interface.
3. **`main2.py`** integrates API Gateway and Lambda functions for subscription management, following best practices for scalable and maintainable cloud applications.

- **Functionality:**

  - **User Session Validation:**
    - Ensures the user is logged in before accessing main features.

  - **Subscription Area:**
    - Retrieves user subscriptions from the `subscription` table.
    - Generates presigned URLs for artist images stored in S3.
    - Displays subscriptions with song details and images.
    - Allows users to remove subscriptions via the `/unsubscribe` route.

  - **Query Area:**
    - Allows users to search for songs by title, artist, and year.
    - Builds a filter expression based on provided criteria.
    - Retrieves matching songs from the `music` table.
    - Generates presigned URLs for artist images.
    - Displays query results with an option to subscribe.

  - **Subscription Management:**
    - **Subscribe:**
      - Invokes the API Gateway endpoint to trigger the `Lambda_Subscribe` function.
      - Adds a new subscription to the `subscription` table.
    - **Unsubscribe:**
      - Invokes the API Gateway endpoint to trigger the `Lambda_Subscribe` function.
      - Removes the subscription from the `subscription` table.

  - **Logout:**
    - Clears the user session and redirects to the login page.

- **Templates:**
  - **`main.html`**
    - Displays user subscriptions and query results.
    - Includes forms to subscribe or unsubscribe from songs.
  - **`query.html`**
    - Provides a form to input query criteria.

### Task 6: API Gateway and Lambda Functions

- **Purpose:** Enables communication between the application and DynamoDB through RESTful APIs.

- **API Gateway:**

  - **Endpoints:**
    - `/register` (POST): Triggers the `Lambda_Register` function.
    - `/subscriptions` (POST/DELETE): Triggers the `Lambda_Subscribe` function.

- **Lambda Functions:**

  - **`Lambda_Register`:**
    - Handles user registration.
    - Adds new user data to the `login` table.

  - **`Lambda_Subscribe`:**
    - Manages user subscriptions.
    - Adds or removes entries in the `subscription` table based on the HTTP method.

- **Integration with the Application:**

  - **`main.py` and `register.py`**
    - Use the `requests` library to make HTTP requests to the API endpoints.
    - Handle responses and provide user feedback accordingly.

---

## Security Considerations

- **Secure Access to S3:**
  - Uses presigned URLs to grant temporary access to artist images in S3.
  - Ensures images are not publicly accessible without authorization.

- **User Session Management:**
  - Implements session management to protect user data.
  - Uses Flask's `session` and `secret_key` for secure sessions.

- **Input Validation:**
  - Validates user inputs on registration and login.
  - Sanitizes query parameters to prevent injection attacks.

- **AWS IAM Roles:**
  - Attaches necessary permissions to the EC2 instance role.
  - Follows the principle of least privilege.

---

## Acknowledgements

- **Data Source:**
  - Music data and images are sourced from the provided `a1.json` file.

- **Libraries and Frameworks:**
  - **Flask:** For building the web application.
  - **Bootstrap:** For responsive and modern UI design.
  - **Boto3:** For interacting with AWS services.

- **Guidelines:**
  - Project developed following the assessment specifications provided.

---

**Note:** This application is developed for educational purposes. Ensure you follow AWS best practices and consider cost implications when deploying AWS resources.
