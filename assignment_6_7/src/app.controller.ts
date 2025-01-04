import { Controller, Get, Query, HttpException, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller('youtube')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHome(@Res() res: Response) {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>YouTube to MP3 Converter</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }
              
              body {
                  font-family: 'Inter', sans-serif;
                  background: linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%);
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #fff;
                  padding: 20px;
              }
              
              .container {
                  background: rgba(255, 255, 255, 0.1);
                  backdrop-filter: blur(10px);
                  padding: 2rem;
                  border-radius: 16px;
                  width: 100%;
                  max-width: 600px;
                  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
              }
              
              h1 {
                  font-size: 2rem;
                  font-weight: 600;
                  margin-bottom: 1.5rem;
                  text-align: center;
                  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
              }
              
              .form-group {
                  margin-bottom: 1.5rem;
                  position: relative;
              }
              
              input[type="text"] {
                  width: 100%;
                  padding: 1rem;
                  background: rgba(255, 255, 255, 0.05);
                  border: 2px solid rgba(255, 255, 255, 0.1);
                  border-radius: 12px;
                  font-size: 1rem;
                  color: #fff;
                  transition: all 0.3s ease;
              }
              
              input[type="text"]:focus {
                  outline: none;
                  border-color: #ff6b6b;
                  background: rgba(255, 255, 255, 0.1);
              }
              
              input[type="text"]::placeholder {
                  color: rgba(255, 255, 255, 0.5);
              }
              
              button {
                  width: 100%;
                  padding: 1rem;
                  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
                  border: none;
                  border-radius: 12px;
                  color: white;
                  font-size: 1rem;
                  font-weight: 600;
                  cursor: pointer;
                  transition: transform 0.2s ease, box-shadow 0.2s ease;
              }
              
              button:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
              }
              
              button:active {
                  transform: translateY(0);
              }
              
              #result {
                  margin-top: 1.5rem;
                  padding: 1rem;
                  border-radius: 12px;
                  font-size: 0.95rem;
                  line-height: 1.5;
              }
              
              .success {
                  background: rgba(46, 213, 115, 0.1);
                  border: 2px solid rgba(46, 213, 115, 0.3);
              }
              
              .error {
                  background: rgba(255, 71, 87, 0.1);
                  border: 2px solid rgba(255, 71, 87, 0.3);
              }
              
              .loading {
                  text-align: center;
                  color: rgba(255, 255, 255, 0.8);
              }
              
              .download-link {
                  display: inline-block;
                  margin-top: 1rem;
                  padding: 0.75rem 1.5rem;
                  background: rgba(255, 255, 255, 0.1);
                  border-radius: 8px;
                  color: #fff;
                  text-decoration: none;
                  transition: all 0.3s ease;
              }
              
              .download-link:hover {
                  background: rgba(255, 255, 255, 0.2);
              }
              
              .info-row {
                  display: flex;
                  align-items: center;
                  margin-bottom: 0.5rem;
              }
              
              .info-row i {
                  margin-right: 0.5rem;
                  color: #ff6b6b;
              }
              
              .loading-spinner {
                  display: inline-block;
                  width: 1.5rem;
                  height: 1.5rem;
                  border: 3px solid rgba(255, 255, 255, 0.3);
                  border-radius: 50%;
                  border-top-color: #fff;
                  animation: spin 1s linear infinite;
                  margin-right: 0.5rem;
              }
              
              @keyframes spin {
                  to { transform: rotate(360deg); }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1><i class="fab fa-youtube"></i> YouTube to MP3</h1>
              <div class="form-group">
                  <input type="text" id="videoUrl" placeholder="Paste YouTube URL here..." 
                         onchange="extractVideoId(this.value)">
              </div>
              <div class="form-group">
                  <input type="text" id="videoId" placeholder="Video ID (auto-detected)" readonly>
              </div>
              <button onclick="convertToMp3()">
                  <i class="fas fa-music"></i> Convert to MP3
              </button>
              <div id="result"></div>
          </div>

          <script>
              function extractVideoId(url) {
                  const videoId = document.getElementById('videoId');
                  try {
                      const urlObj = new URL(url);
                      if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
                          const searchParams = new URLSearchParams(urlObj.search);
                          videoId.value = searchParams.get('v');
                      } else if (urlObj.hostname === 'youtu.be') {
                          videoId.value = urlObj.pathname.slice(1);
                      }
                  } catch (error) {
                      videoId.value = '';
                  }
              }

              async function convertToMp3() {
                  const resultDiv = document.getElementById('result');
                  const videoId = document.getElementById('videoId').value;

                  if (!videoId) {
                      resultDiv.className = 'error';
                      resultDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a valid YouTube URL';
                      return;
                  }

                  try {
                      resultDiv.className = 'loading';
                      resultDiv.innerHTML = '<div class="loading-spinner"></div> Converting your video...';
                      
                      const response = await fetch(\`/youtube/mp3?id=\${videoId}\`);
                      const data = await response.json();

                      if (data.status === 'ok') {
                          resultDiv.className = 'success';
                          resultDiv.innerHTML = \`
                              <div class="info-row">
                                  <i class="fas fa-heading"></i>
                                  <span>\${data.title}</span>
                              </div>
                              <div class="info-row">
                                  <i class="fas fa-clock"></i>
                                  <span>\${data.duration}</span>
                              </div>
                              <a href="\${data.link}" class="download-link" target="_blank">
                                  <i class="fas fa-download"></i> Download MP3
                              </a>
                          \`;
                      } else {
                          resultDiv.className = 'error';
                          resultDiv.innerHTML = \`<i class="fas fa-exclamation-circle"></i> \${data.msg || 'Conversion failed'}\`;
                      }
                  } catch (error) {
                      resultDiv.className = 'error';
                      resultDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> An error occurred during conversion';
                  }
              }
          </script>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
  }

  @Get('mp3')
  async getMp3(@Query('id') id: string) {
    if (!id) {
      throw new HttpException('Video ID parameter is required', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.appService.getYoutubeMp3(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get MP3',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
