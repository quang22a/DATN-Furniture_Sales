import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { setModal } from "../../../stores/modal/action";
import { registerAction, setNull } from "../stores/action";
import { Input } from "../../../shared/components/partials/Input";
import { validateEmail, validatePhone } from "../../../shared/validate";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange", reValidateMode: "onChange" });
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const error = useSelector((state) => state.auth.error);
  const msg = useSelector((state) => state.auth.msg);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (!loading) {
      setData(data);
      setLoading(true);
    }
  };

  useEffect(() => {
    if (loading && data) {
      dispatch(registerAction(data));
    }
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    if (error === false) {
      navigate("/auth/login");
      dispatch(
        setModal({
          key: "snapback",
          title: "",
          content: "Register success",
        })
      );
    }
    setLoading(false);
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(setNull());
    };
  }, []);

  const inputData = [
    {
      id: "name",
      type: "text",
      label: "Họ tên",
      className: "form-control",
      validate: register("name", { required: "Bạn phải nhập họ tên" }),
      errors: errors.name,
      para: "",
    },
    {
      id: "phone",
      type: "text",
      label: "Số điện thoại",
      className: "form-control",
      validate: register("phone", { ...validatePhone }),
      errors: errors.phone,
      para: "",
    },
    {
      id: "email",
      type: "text",
      label: "Email",
      className: "form-control",
      validate: register("email", { ...validateEmail }),
      errors: errors.email,
      para: "",
    },
    {
      id: "address",
      type: "text",
      label: "Địa chỉ",
      className: "form-control",
      validate: register("address", { required: "Bạn phải nhập địa chỉ" }),
      errors: errors.address,
      para: "",
    },
    {
      id: "password",
      type: "password",
      label: "Mật khẩu",
      className: "form-control",
      validate: register("password", {
        required: "Bạn phải nhập mật khẩu",
        minLength: 6,
      }),
      errors: errors.password,
      para: "Mật khẩu phải dài hơn hoặc bằng 6 ký tự!",
    },
  ];

  const showError = () => {
    if (error) {
      console.log(error);
      if (msg.response?.data?.errors) {
        return msg.response?.data?.errors[0];
      } else {
        return msg.response?.data?.msg;
      }
    } else {
      return null;
    }
  };

  return (
    <div className="container-auth">
      <div className="section-auth">
        <div className="auth auth-register">
          <h3>Đăng ký</h3>
          <div
            className={
              error ? "error-msg text-center" : "error-msg text-center is-hide"
            }
          >
            {showError()}
          </div>
          <form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
            {inputData.map((item, index) => (
              <Input
                id={item.id}
                type={item.type}
                label={item.label}
                className={item.className}
                validate={item.validate}
                errors={item.errors}
                para={item.para}
                key={index + 1}
              />
            ))}
            <button
              type="submit"
              className="btn btn-auth"
              disabled={!isDirty || !isValid}
            >
              Đăng ký
            </button>
          </form>
          <Link to="/auth/login" className="btn btn-outline">
            Đăng nhập
          </Link>
        </div>
        <button className="btn btn-back-auth" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
      </div>
    </div>
  );
};

export default Register;
