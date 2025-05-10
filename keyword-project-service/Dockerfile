From python:3.9-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirement.txt

EXPOSE 5000

CMD ["uvicorn", "main:api", "--host", "0.0.0.0", "--port", "5000"]
#CMD ["uvicorn", "main:api"]

