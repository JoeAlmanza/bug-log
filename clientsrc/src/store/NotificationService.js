import Swal from "sweetalert2";
export default class NotificationService {
  static async confirmAction(
    title = "Are you sure",
    text = "You won't be able to revert this!"
  ) {
    try {
      let res = await Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        // iconHtml: `<img
        //   src="https://media4.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif"
        //   style="width: 200px"
        //   alt
        // />`,
        showCancelButton: true,
        confirmButtonColor:  "lightGreen",
        cancelButtonColor: "lightCoral",
        confirmButtonText: "Yes, submit!",
      });
      if (res.value) {
        return true;
      }
      return false;
    } catch (error) {}
  }
  static toast(title = "Default Toast", timer = 2000, icon = "info") {
    // @ts-ignore
    Swal.fire({
      title: title,
      icon: icon,
      // iconHtml: `<img
      //   src="https://media4.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif"
      //   style="width: 50px"
      //   alt
      // />`,
      timer: timer,
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }
}