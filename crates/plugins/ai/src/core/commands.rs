use tauri::{command, AppHandle, Runtime, Window};

#[command]
pub fn send_ask<R: Runtime>(
    _app: AppHandle<R>,
    _window: Window<R>,
    params: String,
) {
    println!("{:?}", params);
    // implement command logic here
    // on_progress.send(100).unwrap();
}

#[allow(dead_code)]
#[cfg(test)]
mod tests {

   /*  #[tokio::test]
    async fn test1() -> Result<()> {
       let sdk =  AiSdk::new("1232232".to_string());
       let req = ChatCompletionRequest::new();
       let res = sdk.chat_completion(req).await?;
       assert_eq!(res.object, "");
        assert_eq!(1, 1)
    } */
}

