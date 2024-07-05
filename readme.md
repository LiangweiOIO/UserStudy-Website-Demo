<!--
 * @Author: Liangwei Wang liangweioio27@gmail.com
 * @Date: 2024-07-04 16:55:16
 * @LastEditTime: 2024-07-05 18:47:35
 * @LastEditors: Liangwei Wang
-->
# Image Data Preparation and Project Setup

This project involves preparing image data and setting up a backend and frontend for conducting image studies.

## Image Data Preparation

1. **Image Placement**:
   - Place your images in the folder `backend/public/images`.

2. **Configuration**:
   - Set the image path and question ID for the two studies in `backend/config.json`.

## Backend Setup

To run the backend, follow these steps:

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Install necessary Python packages using Conda:
    ```bash
    conda install flask flask-cors
    ```

3. Set the FLASK_APP environment variable:
    ```bash
    export FLASK_APP=app.py
    ```

4. Run the Flask application:
    ```bash
    flask run
    ```

## Frontend Setup

To run the frontend, follow these steps:

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2. Install necessary npm packages:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

## Project Structure

```
project-root/
├── backend/
│   ├── public/
│   │   └── images/
│   ├── config.json
│   ├── app.py
│   └── ...
├── frontend/
│   ├── src/
│   │   └── views/
│   │       ├── StudyOne.vue
│   │       ├── StudyTwo.vue
│   │       └── ...
│   ├── package.json
│   └── ...
└── ...
```

## Configuration Example

The `backend/config.json` file should contain the paths and question IDs for the images used in the studies. Below is an example of how this file might be structured:

```json
{
  "studyOne": [
    {
      "img": "image1.jpg",
      "QID": "Q1"
    },
    {
      "img": "image2.jpg",
      "QID": "Q2"
    }
  ],
  "studyTwo": [
    {
      "img1": "image1.jpg",
      "img2": "image2.jpg",
      "QID": "Q1"
    },
    {
      "img1": "image3.jpg",
      "img2": "image4.jpg",
      "QID": "Q2"
    }
  ]
}
```

## Additional Notes

- Ensure that the paths in `config.json` match the actual filenames of your images in the `backend/public/images` directory.
- The frontend assumes that the backend is running on `http://127.0.0.1:5000`. If your backend is running on a different address or port, you may need to adjust the API endpoints in your frontend code accordingly.
- Use `conda` or `virtualenv` to manage your Python environment to avoid package conflicts.
