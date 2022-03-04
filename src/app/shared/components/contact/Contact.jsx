import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "../partials/Input";
import { useForm } from "react-hook-form";
import { validateEmail, validatePhone } from "../../validate";
import img from "../../../../assets/images/sectioncontact.jpg";
import { addContact } from "../../../pages/contact/stores/action";
import { contactReducer } from "../../../pages/contact/stores/reducer";

export const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange", reValidateMode: "onChange" });
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);

  const error = useSelector((state) => state.contactReducer.error);

  const [msgContact, setMsgContact] = useState("");
  const watchName = watch("name");
  const watchPhoneNumber = watch("phone");
  const watchEmail = watch("email");

  const onSubmit = async () => {
    await dispatch(
      addContact({
        name: watchName,
        phone: watchPhoneNumber,
        email: watchEmail,
        msg: msgContact,
      })
    );
    setIsSubmit(true);
  };

  useEffect(() => {
    if (!error && isSubmit) {
      setValue("name", "");
      setValue("phone", "");
      setValue("email", "");
      setMsgContact("");
    }
  }, [error, isSubmit]);

  return (
    <div className="section-contact">
      <div className="container">
        <div className="contact">
          <div className="info">
            <div className="title">
              <h3>Bạn cần hỗ trợ?</h3>
              <p>Xin vui lòng để lại yêu cầu hỗ trợ của bạn.</p>
            </div>
            <form className="form-contact" onSubmit={handleSubmit(onSubmit)}>
              <Input
                id="name"
                name="name"
                type="text"
                validate={register("name", {
                  required: "Name is required",
                })}
                errors={errors.name}
                className="form-control name"
                placeholder="Họ tên"
              />
              <Input
                id="phone"
                name="phone"
                type="text"
                validate={register("phone", { ...validatePhone })}
                errors={errors.phone}
                className="form-control phone"
                placeholder="0123456789"
              />
              <Input
                id="email"
                name="email"
                type="text"
                validate={register("email", { ...validateEmail })}
                errors={errors.email}
                className="form-control email"
                placeholder="Email"
                para=""
              />
              <textarea
                name="msg"
                id="msg"
                rows="4"
                className="form-control msg"
                placeholder="Nội dung liên hệ"
                onChange={(e) => {
                  setMsgContact(e.target.value);
                }}
              ></textarea>
              <button
                type="submit"
                className="btn btn-contact"
                disabled={!isDirty || !isValid}
              >
                Gửi yêu cầu
              </button>
            </form>
          </div>
          <div className="img">
            <img src={img} alt="image liên hệ" />
          </div>
        </div>
      </div>
    </div>
  );
};
