import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/pensieve/status',
    method: 'post',
    timeout: 300,
    response: ({ body }: { body: { fileName: string; fileSize: number } }) => ({
      fileId: `file-${Date.now()}`,
      uploadedChunks: [],
      exists: false
    })
  },
  {
    url: '/api/quantum-transfer',
    method: 'post',
    timeout: () => 300 + Math.random() * 700,
    response: () => ({
      success: Math.random() > 0.2
    })
  },
  {
    url: '/api/ministry/verify/:fileId',
    method: 'get',
    timeout: 500,
    response: ({ query }: { query: { fileId: string } }) => ({
      merkleRoot: 'simulated-merkle-root'
    })
  }
] as MockMethod[]