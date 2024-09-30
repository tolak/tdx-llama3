## Containers

### llama3

A llama3 service listening on http:://localhost:11434, management with [ollama](https://github.com/ollama/ollama)

### signproxy

A proxy service to sign every message data included in response returned from llama3, the signer is an ECDSA-based key. The service listening on http://localhost:1213, when container started, you will see the singer information in logs:

```
signproxy  | TEE signer address: 0x2d49291FF4fDb344ED753b1a7D44fB063997EbBF
signproxy  | Proxy service running on http://localhost:3000
```

Request should send to http://localhost:1213 directly, for example:

```
$ curl http://localhost:1213/api/chat \
    -H "Content-Type: application/json" \
    -d '{
        "model": "llama3",
        "messages": [{"role": "user", "content": "Reply the result of 1+1"}],
        "temperature": 0.7
    }'
```

You will get reponse like below, the `singature` is signed by account inside TEE

```
{"model":"llama3","created_at":"2024-09-30T09:02:00.484512914Z","message":{"role":"assistant","content":"The"},"done":false}
{"model":"llama3","created_at":"2024-09-30T09:02:04.277685273Z","message":{"role":"assistant","content":" answer"},"done":false}
{"model":"llama3","created_at":"2024-09-30T09:02:08.331020374Z","message":{"role":"assistant","content":" is"},"done":false}
{"model":"llama3","created_at":"2024-09-30T09:02:12.337598802Z","message":{"role":"assistant","content":":"},"done":false}
{"model":"llama3","created_at":"2024-09-30T09:02:16.392806598Z","message":{"role":"assistant","content":" "},"done":false}
{"model":"llama3","created_at":"2024-09-30T09:02:20.320717409Z","message":{"role":"assistant","content":"2"},"done":false}
{"model":"llama3","created_at":"2024-09-30T09:02:24.209788186Z","message":{"role":"assistant","content":""},"done_reason":"stop","done":true,"total_duration":36682074829,"load_duration":8402298769,"prompt_eval_count":18,"prompt_eval_duration":4548739000,"eval_count":7,"eval_duration":23725236000}
{"signature":"0xff3bdc76810d7e399befc25ff23a64c16cc6d432bfd97c322f887b31af8344440c48904ec560213b5784feceafb096ee1878fb4f00f37ee00c5e4690b7b7ac541b"}
```