import Swal from 'sweetalert2';

const primaryColor = '#00b7b5';

export const showSuccess = (message, title = 'Berhasil!') => {
  return Swal.fire({
    icon: 'success',
    title,
    text: message,
    confirmButtonColor: primaryColor,
    timer: 3000,
    timerProgressBar: true,
  });
};

export const showError = (message, title = 'Gagal!') => {
  return Swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonColor: primaryColor,
  });
};

export const showWarning = (message, title = 'Peringatan!') => {
  return Swal.fire({
    icon: 'warning',
    title,
    text: message,
    confirmButtonColor: primaryColor,
  });
};

export const showConfirm = (message, title = 'Apakah Anda yakin?') => {
  return Swal.fire({
    icon: 'question',
    title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: primaryColor,
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, lanjutkan!',
    cancelButtonText: 'Batal',
  });
};

export const showLoading = (message = 'Memproses...') => {
  return Swal.fire({
    title: message,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeLoading = () => {
  Swal.close();
};
