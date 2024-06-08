export default function (modalId: string, show: boolean) {
  const modal = document.getElementById(modalId) as HTMLDialogElement
  if (modal) show ? modal.showModal() : modal.close()
}
