export const PaymentOptions: React.FC = () => {
  return (
    <>
      <h2 className="text-lg font-medium mb-4">결제 수단</h2>
      <div className="bg-white rounded-lg shadow-md mb-4 p-4">
        <div>
          <ul className="flex flex-col gap-6">
            <li>
              <label htmlFor="card" className="custom-radio">
                <input type="radio" name="payment" id="card" />
                <span className="radio-indicator"></span>
                신용/체크카드
              </label>
            </li>
            <li>
              <label htmlFor="kakaopay" className="custom-radio">
                <input type="radio" name="payment" id="kakaopay" />
                <span className="radio-indicator"></span>
                카카오페이
              </label>
            </li>
            <li>
              <label htmlFor="naverpay" className="custom-radio">
                <input type="radio" name="payment" id="naverpay" />
                <span className="radio-indicator"></span>
                네이버페이
              </label>
            </li>
            <li>
              <label htmlFor="mobile" className="custom-radio">
                <input type="radio" name="payment" id="mobile" />
                <span className="radio-indicator"></span>
                휴대폰 결제
              </label>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
