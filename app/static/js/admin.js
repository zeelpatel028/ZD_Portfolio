/**
 * VS CODE INSPIRED ADMIN DASHBOARD JS — ZEEL DOBARIYA PORTFOLIO
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Confirm destructive actions (e.g. Delete buttons)
  const deleteForms = document.querySelectorAll("form.confirm-delete");
  deleteForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      const itemTitle = form.dataset.itemTitle || "this item";
      const confirmDelete = confirm(`⚠️ Are you sure you want to permanently delete ${itemTitle}? This action cannot be undone.`);
      if (!confirmDelete) {
        e.preventDefault();
      }
    });
  });

  // 2. Image File Preview
  const imageInputs = document.querySelectorAll("input[type='file'][data-preview-target]");
  imageInputs.forEach(input => {
    input.addEventListener("change", (e) => {
      const targetId = input.getAttribute("data-preview-target");
      const previewImg = document.getElementById(targetId);
      if (previewImg && input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImg.src = e.target.result;
          previewImg.style.display = "block";
        };
        reader.readAsDataURL(input.files[0]);
      }
    });
  });

  // 3. OTP Auto-focus & digit handling
  const otpInputs = document.querySelectorAll(".otp-digit-input");
  if (otpInputs.length > 0) {
    otpInputs.forEach((input, index) => {
      input.addEventListener("input", (e) => {
        if (input.value.length >= 1 && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
        updateFullOtpValue();
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "" && index > 0) {
          otpInputs[index - 1].focus();
        }
      });
    });

    function updateFullOtpValue() {
      const hiddenOtpInput = document.getElementById("full_otp_code");
      if (hiddenOtpInput) {
        let code = "";
        otpInputs.forEach(i => code += i.value.trim());
        hiddenOtpInput.value = code;
      }
    }
  }

  // 4. Client-side Table Search Filter
  const tableSearchInput = document.getElementById("admin-table-search");
  if (tableSearchInput) {
    tableSearchInput.addEventListener("input", () => {
      const filter = tableSearchInput.value.toLowerCase();
      const rows = document.querySelectorAll(".admin-table tbody tr");
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
      });
    });
  }

  // 5. Contact Message Detail Viewer
  const viewMsgBtns = document.querySelectorAll(".view-msg-btn");
  viewMsgBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const sender = btn.getAttribute("data-sender") || "Unknown Sender";
      const email = btn.getAttribute("data-email") || "";
      const date = btn.getAttribute("data-date") || "";
      const message = btn.getAttribute("data-message") || "";
      alert(`📩 Sender: ${sender} (${email})\n📅 Date: ${date}\n\n💬 Message Payload:\n${message}`);
    });
  });
});
