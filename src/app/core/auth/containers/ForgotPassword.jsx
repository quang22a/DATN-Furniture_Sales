import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "../../../shared/components/partials/Input";
import { validateEmail } from "../../../shared/validate";
import { requestResetPassword, changePasswordReset } from "../stores/action";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [confirmCode, setConfirmCode] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  const errorRequestReset = useSelector(
    (state) => state.auth.errorRequestReset
  );
  const msgRequestReset = useSelector((state) => state.auth.msgRequestReset);
  const errorResetPass = useSelector((state) => state.auth.errorResetPass);

  const onSubmit = async (data) => {
    if (msgRequestReset?.status === 200 && confirmCode) {
      await dispatch(changePasswordReset(data));
      setIsResetPassword(true);
    } else {
      await dispatch(requestResetPassword({ email: data.email }));
      setConfirmCode(true);
    }
  };

  useEffect(() => {
    if (confirmCode && msgRequestReset?.status === 200) {
    }
  }, [msgRequestReset, confirmCode]);

  useEffect(() => {
    if (isResetPassword && !errorResetPass) {
      navigate("/auth/login");
    }
  }, [isResetPassword]);

  return (
    <div className="container-auth">
      <div className="section-auth">
        <div className="auth">
          <h3>Quên mật khẩu</h3>
          <div className="error-msg text-center"></div>
          <form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              type="text"
              label="Địa chỉ email"
              className="form-control"
              validate={register("email", { ...validateEmail })}
              errors={errors.email}
              para=""
            />
            <Input
              id="code"
              type="text"
              label="Mã xác nhận"
              className="form-control"
              validate={register("code")}
              errors={errors.code}
              para=""
            />
            <Input
              id="password"
              type="text"
              label="Mật khẩu"
              className="form-control"
              validate={register("password")}
              errors={errors.password}
              para=""
            />
            {msgRequestReset?.status === 200 && confirmCode ? (
              <button type="submit" className="btn btn-auth">
                Xác nhận
              </button>
            ) : (
              <button type="submit" className="btn btn-auth">
                Gửi
              </button>
            )}
          </form>
          <Link to="/auth/login" className="btn btn-outline">
            Đăng nhập
          </Link>
          <Link to="/auth/register" className="btn btn-outline">
            Đăng ký
          </Link>
        </div>
        <button className="btn btn-back-auth" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
