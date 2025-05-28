"use client";
import { use, useState, SyntheticEvent } from "react";
import OtpInput from "./OtpInput";
import { useRouter } from "next/navigation";
import { app_config } from "../libs/config";

const OptModal = ({ email, accId }: { email: string; accId: string }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const url = app_config.api_base_url + "/auth/login";
    try {
      const resp = await fetch(`${url}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          API_PROJECT_ID: app_config.api_project_id,
          API_KEY: app_config.api_key,
        },
        body: JSON.stringify({
          email: email,
          otp: otp.join(""),
        }),
      });

      if (resp.ok) {
        const data = await resp.json();
        if (data.id) {
          router.push(
            `/?id=${encodeURIComponent(data.id)}&fullname=${encodeURIComponent(data.fullname)}&email=${encodeURIComponent(data.email)}`
          );
        }
      } else {
        const errorData = await resp.text();
        console.error("Error response:", errorData);
        setIsError(errorData);
      }
    } catch (err) {
      setIsError(`Failed to create account: ${err}`);
      console.error("Error submitting OTP:", err);
    }

    setIsLoading(false);
    onClose();
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      console.log("Resending OTP");
    } catch (err) {
      console.error("Error resending OTP:", err);
    }

    setIsLoading(false);
  };

  const onClose = async () => {
    setOtp(Array(6).fill(""));
    setIsOpen(false);
  };
  return (
    <>
      <div className="modal-backdrop">
        <div className="modal">
          <h1 className="shad-alert-dialog">
            Enter OTP
            {/* <Image
              src="/assets/close.svg"
              alt="Close"
              width={20}
              height={20}
              onClick={onClose}
              style={{ cursor: "pointer", float: "right" }}
            /> */}
          </h1>

          <p className="text-1xl justify-center text-blue-400">
            We have sent an opt pin to {email}
          </p>
          <OtpInput value={otp} onChange={setOtp} />
          <div style={{ marginTop: "20px" }}>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={onClose} style={{ marginLeft: "10px" }}>
              Cancel
            </button>
          </div>
        </div>
        <style jsx>{`
          .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .modal {
            background: white;
            padding: 30px;
            border-radius: 8px;
            max-width: 400px;
            width: 100%;
          }
        `}</style>
      </div>
    </>
  );
};

export default OptModal;
