# Use the official Python image from the Docker Hub
FROM python:3.12

# Project secret key define for build argument
ARG SECRET_KEY

# Set environment variables for Python to run in unbuffered mode
ENV PYTHONUNBUFFERED=1

# Set the working directory within the container
WORKDIR /app

# Install Node.js and npm
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy app into image
COPY . /app/

# Install dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Change to the theme/static_src directory and install Node.js dependencies
WORKDIR /app/theme/static_src
RUN npm install

WORKDIR /app/website/frontend
RUN npm install

# Change back to the app directory to copy the rest of the application code
WORKDIR /app
RUN npm install

# Run Tailwind build and collect static files
RUN npm run build && python manage.py collectstatic --noinput

# Expose port 8000 for the Django application
EXPOSE 8000

# Command to run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
