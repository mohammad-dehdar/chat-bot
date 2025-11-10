import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        GWT: JSON.stringify(
          process.env.GWT ||
            "a8e4e8869d350933d98ed772f40364dd37a63084d415ee512768b460d7c01db9"
        ),
        TEST_TOKEN: JSON.stringify(
          process.env.TEST_TOKEN ||
            "vgdibigmslgencniieaxjjotbxfehcyenrhqyurjruyukdwdqxxjqueabdjyqgoxoswchsmnwvuuvqknxurowonfapaxgafd"
        ),
      })
    );
    return config;
  },
};

export default nextConfig;
