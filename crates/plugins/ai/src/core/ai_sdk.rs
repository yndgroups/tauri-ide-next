use std::time::Duration;

use anyhow::Result;
use reqwest::{Client, RequestBuilder};

use crate::apis::{chat_completion::ChatCompletionResponse, create_image::CreateImageResponse};
pub const  TIMEOUT: u64 = 30;


pub trait IntoRequest {
    fn into_request(self, client: Client) -> RequestBuilder;
}

#[allow(dead_code)]
#[derive(Debug, Clone)]
pub struct AiSdk {
    pub token: String,
    pub client: Client,
}

#[allow(dead_code)]
impl AiSdk {
    pub fn new(token: String) -> Self {
        Self {
            token,
            client: Client::new(),
        }
    }

    /// api
    pub async fn chat_completion(&self, req: impl IntoRequest) -> Result<ChatCompletionResponse> {
        let req = self.prepare_request(req);
        let res = req.send().await?;
        Ok(res.json::<ChatCompletionResponse>().await?)
    }

    /// 图片
    pub async fn create_image(&self, req: impl IntoRequest) -> Result<CreateImageResponse> {
        let req = self.prepare_request(req);
        let res = req.send().await?;
        Ok(res.json::<CreateImageResponse>().await?)
    }

    /// 提取公共代码
    fn prepare_request(&self, req: impl IntoRequest) -> RequestBuilder {
        let req = req.into_request(self.client.clone());
        let req = if self.token.is_empty() {
            req
        } else {
            req.bearer_auth(&self.token)
        };
        req.timeout(Duration::from_secs(TIMEOUT))
    }
}
