const showToast = (isSuccess: boolean, message: string) => {
  const toast = document.getElementById("toast")
  toast!.innerHTML = message
  if (toast) {
    toast.classList.add("show")
    toast.classList.add(isSuccess ? "toast-success" : "toast-error")

    setTimeout(() => {
      toast.classList.remove("show")
      toast.classList.remove(isSuccess ? "toast-success" : "toast-error")
    }, 3000)
  }
}

export default showToast
