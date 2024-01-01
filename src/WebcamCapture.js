import Webcam from "react-webcam";
import OpenAI from "openai";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

const openai = new OpenAI({ apiKey: "sk-XXX", dangerouslyAllowBrowser: true });

const WebcamCapture = () => (
    <Webcam
        audio={false}
        height={720}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
    >
    {({ getScreenshot }) => (
      <button
        onClick={async () => {
          console.log("button clicked");
          const imageSrc = getScreenshot();

          const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            max_tokens: 2000,
            messages: [
                {
                    role: "user",
                    content: [
                        {type: "text", text: "Is the person in the picture happy or sad?"},
                        {type: "image_url", image_url: imageSrc}
                    ]
                }
            ]
          })
          console.log(response);
          console.log(response.choices[0].message.content);
        }}
      >
        Capture photo
      </button>
    )}
  </Webcam>
)

export default WebcamCapture;