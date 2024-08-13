use serde::{Deserialize, Serialize};
use crate::core::ai_sdk::IntoRequest;
use derive_builder::Builder;

#[derive(Debug, Clone, Deserialize)]
pub struct CreateImageResponse {
   pub created: u64,
   pub data: Vec<ImageObj>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct ImageObj {
    pub b64_json: Option<String>,
    pub url: Option<String>,
    pub revised_prompt: String
}
 
#[derive(Debug, Clone, Serialize, Deserialize, Builder)]
#[builder(pattern = "mutable")]
pub struct CreateImageRequest {
    #[builder(setter(into))]
    pub prompt: String,
    #[builder(default)]
    pub model: ImageModel,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    n: Option<usize>,
    #[builder(default)]
    quality: ImageQuality,
    #[builder(default)]
    response_format: ImageResponseFormat,
    #[builder(default)]
    size: ImageSize,
    #[builder(default, setter(strip_option))]
    #[serde(skip_serializing_if = "Option::is_none")]
    style: Option<ImageStyle>,
    #[builder(default, setter(strip_option, into))]
    #[serde(skip_serializing_if = "Option::is_none")]
    user: Option<String>,
}

impl CreateImageRequest {
    pub fn new(prompt: impl Into<String>) -> Self {
        CreateImageRequestBuilder::default()
        .prompt(prompt)
        .build()
        .unwrap()
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Copy)]
#[serde(rename_all = "snake_case")]
pub enum ImageStyle {
    Vivid,
    Natural,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Copy)]
#[serde(rename_all = "snake_case")]
pub enum ImageSize {
    #[serde(rename = "1024x1024")]
    Large,
    #[serde(rename = "1792x1024")]
    LargeWide,
    #[serde(rename = "1024x1792")]
    LargeTall,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Copy)]
#[serde(rename_all = "snake_case")]
pub enum ImageResponseFormat {
    Url,
    B64Json,
}

impl Default for ImageResponseFormat {
    fn default() -> Self {
        ImageResponseFormat::Url
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Copy)]
#[serde(rename_all = "snake_case")]
pub enum ImageQuality {
    Standard,
    Hd,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Copy)]
pub enum ImageModel {
    #[serde(rename = "dall-e-3")]
    DallE3,
}

impl IntoRequest for CreateImageRequest {
    fn into_request(self, client: reqwest::Client) -> reqwest::RequestBuilder {
        client
            .post("https://api.openai.com/v1/images/generations")
            .json(&self)
    }
}

impl Default for ImageQuality {
    fn default() -> Self {
        ImageQuality::Standard
    }
}

impl Default for ImageSize {
    fn default() -> Self {
        ImageSize::Large
    }
}

impl Default for ImageStyle {
    fn default() -> Self {
        ImageStyle::Vivid
    }
}

// 为Builder提供default方法
impl Default for ImageModel {
    fn default() -> Self {
        ImageModel::DallE3
    }
}
