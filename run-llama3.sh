#!/bin/sh

# Start the ollama serve command in the background
ollama serve &

sleep 10

# Pull llama3 model
echo "Start pull llama3 model"
ollama pull llama3

# Run the ollama run llama3 command
echo "Start run llama3"
ollama run llama3

# Keep the container running
tail -f /dev/null