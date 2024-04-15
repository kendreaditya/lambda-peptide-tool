# FROM public.ecr.aws/lambda/nodejs:20
FROM public.ecr.aws/lambda/nodejs:20.2024.01.24.17-x86_64


# Copy function code
COPY app.js ${LAMBDA_TASK_ROOT}
COPY package.json ${LAMBDA_TASK_ROOT}
RUN npm install

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "app.handler" ]
# You can then locally test your function using the docker build and docker run commands.

# To build you image:

# docker build -t <image name> .
# To run your image locally:

# docker run -p 9000:8080 <image name>
# In a separate terminal, you can then locally invoke the function using cURL:

# curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"payload":"hello world!"}'