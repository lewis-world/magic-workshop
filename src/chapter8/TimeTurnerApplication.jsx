import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TimeTurnerSchema = Yup.object().shape({
  travelerName: Yup.string().required('必须输入时间旅行者姓名'),
  destinationYear: Yup.number()
    .min(1970, '不能早于1970年')
    .max(2025, '不能晚于2025年')
    .required('必须指定目标年份'),
  reason: Yup.string()
    .max(100, '原因不能超过100字符')
});

export function TimeTurnerApplication() {
  const initialValues = {
    travelerName: '',
    destinationYear: '',
    reason: '',
    acceptRisk: false
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('时间旅行申请:', values);
    setTimeout(() => {
      alert(`申请已提交至魔法部时间管理局\n旅行者: ${values.travelerName}`);
      setSubmitting(false);
      resetForm();
    }, 1000);
  };

  return (
    <div className="time-form">
      <h2>时间转换器申请表</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={TimeTurnerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty }) => (
          <Form>
            <div className="form-field">
              <label>旅行者姓名</label>
              <Field name="travelerName" type="text" />
              <ErrorMessage name="travelerName" component="div" className="error" />
            </div>

            <div className="form-field">
              <label>目标年份</label>
              <Field name="destinationYear" type="number" />
              <ErrorMessage name="destinationYear" component="div" className="error" />
            </div>

            <div className="form-field">
              <label>旅行原因</label>
              <Field name="reason" as="textarea" />
              <ErrorMessage name="reason" component="div" className="error" />
            </div>

            <div className="form-field">
              <label>
                <Field name="acceptRisk" type="checkbox" />
                我了解时间旅行的风险
              </label>
              <ErrorMessage name="acceptRisk" component="div" className="error" />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                disabled={isSubmitting || !dirty}
                className="time-button"
              >
                {isSubmitting ? '提交中...' : '申请时间旅行'}
              </button>
              
              {dirty && (
                <button type="button" onClick={() => window.location.reload()}>
                  重置时间线
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}