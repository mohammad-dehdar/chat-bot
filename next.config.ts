import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        GWT: JSON.stringify(process.env.GWT || ''),
        TEST_TOKEN: JSON.stringify(process.env.TEST_TOKEN || ''),
      })
    );
    return config;
  },
};

export default nextConfig;
