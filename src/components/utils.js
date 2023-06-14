export function setLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if(isLoading) {
      button.textContent = loadingText
  } else {
      button.textContent = buttonText
  }
}


export function handleSubmit(request, event, loadingText = "Сохранение...") {

   event.preventDefault();

   const submitButton = event.submitter;

   const initialText = submitButton.textContent;

   setLoading(true, submitButton, initialText, loadingText);
   request()
     .then(() => {
      event.target.reset();
     })
     .catch((error) => {

       console.error(`Ошибка: ${error}`);
     })

     .finally(() => {
      setLoading(false, submitButton, initialText);
     });
 }
