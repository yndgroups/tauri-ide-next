use derive_builder::Builder;
use serde::{Deserialize, Serialize};

use crate::core::ai_sdk::IntoRequest;


#[derive(Debug,Clone,Serialize,Deserialize, Builder)]
#[builder(pattern = "mutable")]
pub struct ChatCompletionRequest {
    #[builder(setter(into))]
    pub prompt: String,
    // pub max_tokens: Option<usize>,
    // pub temperature: Option<f64>,
    // pub top_p: Option<f64>,
    // pub n: Option<usize>,
    // pub logprobs: Option<usize>,
    // pub echo: Option<bool>,
    // pub stop: Option<Vec<String>>,
    // pub presence_penalty: Option<f64>,
    // pub frequency_penalty: Option<f64>,
    // pub best_of: Option<usize>,
    // pub logit_bias: Option<serde_json::Value>,
    // pub return_prompt: Option<bool>,
    // pub return_metadata: Option<bool>,
    // pub return_sequences: Option<bool>,
    // pub expand: Option<bool>,
    // pub model: Option<String>,
    // pub model_owner: Option<String>,
    // pub logit_bias_token: Option<String>,
}

impl ChatCompletionRequest {
    /* pub fn new(prompt: Into(String)) -> Self {
        ChatCompletionRequestBuilder::default()
        .prompt(prompt)
        .build()
        .unwrap()
    } */
}

#[derive(Debug,Clone,Serialize,Deserialize)]
pub struct ChatCompletionResponse {
    pub id: String,
    pub object: String,
    pub created: i64,
    pub model: String,
    pub choices: Vec<Choice>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Choice {
// pub text: String,
// pub index: usize,
// pub logprobs: Logprobs,
// pub finish_reason: String,
// pub start: usize,
// pub tokens: Vec<String>,
// pub token_logprobs: Vec<f64>,
// pub text_offset: usize,
// pub text_normalized: String,
}

/// 实现
impl IntoRequest for ChatCompletionRequest {
    fn into_request(self, client: reqwest::Client) -> reqwest::RequestBuilder {
        client.post("https://api.openai.com/v1/chat/completions").json(&self)
    }
}