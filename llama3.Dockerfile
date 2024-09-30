FROM ubuntu:latest

RUN apt update && apt install -y curl

# Install ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

# Set environment variables if needed
ENV OLLAMA_HOST=0.0.0.0
ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# Expose the necessary port
EXPOSE 11434

# Copy the start_ollama.sh script into the container
COPY run-llama3.sh .

# Make the script executable
RUN chmod +x run-llama3.sh

# Run the script during container start-up
CMD ["./run-llama3.sh"]