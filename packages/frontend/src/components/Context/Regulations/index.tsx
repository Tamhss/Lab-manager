import React from 'react';

const LabRegulation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-8 text-black">
      {/* Header Section */}
      <div className="flex justify-between mb-6">
        <div>
          <p className="font-bold">BỘ GIÁO DỤC VÀ ĐÀO TẠO</p>
          <p className="font-bold">TRƯỜNG ĐẠI HỌC ĐẠI NAM</p>
        </div>
        <div className="text-right">
          <p className="font-bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
          <p className="italic font-bold">Độc lập – Tự do – Hạnh phúc</p>
        </div>
      </div>

      {/* Title and Introduction */}
      <h1 className="text-2xl font-bold text-center mb-4">
        QUY ĐỊNH QUẢN LÝ VÀ SỬ DỤNG PHÒNG THÍ NGHIỆM, XƯỞNG THỰC HÀNH
      </h1>
      <p className="text-center italic mb-6">
        (Theo Quyết định số /QĐ-ĐN ngày /08/2024 về việc Ban hành Quy định quản lý và sử dụng phòng thí nghiệm xưởng thực hành thuộc Khoa Công nghệ thông tin)
      </p>

      <p className="mb-4">
        Phòng thí nghiệm, thực hành, xưởng thực hành (sau đây viết tắt là PTN) thuộc Trung tâm Thực hành, Khoa Công nghệ thông tin Trường Đại học Đại Nam là nơi học tập, nghiên cứu khoa học của cán bộ, học viên, sinh viên. Nhà trường yêu cầu khi đến làm việc, nghiên cứu học tập tại PTN phải tuân thủ các quy định sau đây:
      </p>

      {/* Section I: General Regulations */}
      <h2 className="text-xl font-bold mt-6 mb-2">I. QUY ĐỊNH CHUNG</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>Mặc trang phục, đeo thẻ đúng quy định của nhà trường.</li>
        <li>Tuyệt đối không mang các chất dễ gây cháy nổ vào PTN. Không hút thuốc, vứt rác, vẽ lên tường, bàn ghế trong PTN.</li>
        <li>Tuyệt đối không mang tài sản, thiết bị ra khỏi PTN khi chưa được phép của cán bộ phụ trách PTN.</li>
        <li>Nếu có nhu cầu làm việc ngoài giờ tại phòng thí nghiệm, phải đăng ký và được sự phê duyệt của cán bộ phụ trách Trung tâm Thực hành.</li>
        <li>Không làm hư hỏng các trang thiết bị, máy móc và các vật dụng khác hoặc có hành vi gây thiệt hại đến tài sản, cơ sở vật chất PTN.</li>
        <li>Tất cả cán bộ, giảng viên, học viên, sinh viên phải có ý thức giữ gìn vệ sinh chung, không xả rác bừa bãi và sử dụng thùng rác để đổ rác thải. Thường xuyên vệ sinh bàn làm việc và khu vực chung để tạo ra một môi trường làm việc sạch sẽ, gọn gàng.</li>
        <li>Tất cả thành viên phải cư xử lịch sự, tôn trọng lẫn nhau, không gây ồn ào ảnh hưởng đến người khác. Hỗ trợ đồng nghiệp và sinh viên khác khi cần thiết để tạo ra một môi trường làm việc thân thiện và hợp tác.</li>
      </ol>

      {/* Section II: Regulations for Staff and Lecturers */}
      <h2 className="text-xl font-bold mt-6 mb-2">II. QUY ĐỊNH ĐỐI VỚI CÁN BỘ, GIẢNG VIÊN</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>Đến PTN làm việc theo thời khóa biểu hoặc lịch đã đăng ký.</li>
        <li>Xác nhận biên bản giao/nhận tài sản bao gồm thiết bị, dụng cụ, vật tư, mẫu vật với cán bộ phụ trách PTN theo quy định khi sử dụng.</li>
        <li>Phổ biến các nội quy, quy định PTN cho sinh viên trong thời gian học tập và làm việc tại PTN.</li>
        <li>Chịu trách nhiệm quản lý người học và tài sản PTN trong thời gian thực hành, thực tập, nghiên cứu.</li>
        <li>Hướng dẫn, kiểm tra sinh viên làm vệ sinh máy móc thiết bị sau khi sử dụng. Tắt đèn, nguồn điện sau khi giảng dạy và làm việc.</li>
        <li>Ghi, ký xác nhận vào sổ nhật ký PTN chính xác, đầy đủ sau mỗi lần đến làm việc.</li>
        <li>Lập dự trù kinh phí mua sắm thiết bị, dụng cụ … phục vụ thí nghiệm, thực hành, gửi về Trung tâm thực hành trước khi bắt đầu kỳ học mới: Theo mẫu Phụ lục 1.</li>
      </ol>

      {/* Section III: Regulations for Students */}
      <h2 className="text-xl font-bold mt-6 mb-2">III. QUY ĐỊNH ĐỐI VỚI SINH VIÊN, HỌC VIÊN</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>Nghiêm chỉnh chấp hành Nội quy, quy định của PTN. Tuân thủ đúng hướng dẫn của giảng viên, cán bộ phụ trách.</li>
        <li>Có ý thức giữ gìn, bảo quản máy móc, thiết bị trong PTN. Tuyệt đối không tự ý tháo lắp, di chuyển máy móc di chuyển thiết bị khi chưa có sự đồng ý của giảng viên và cán bộ quản lý Trung tâm Thực hành.</li>
        <li>Nếu phát hiện có sự cố thiết bị phải báo ngay cho cán bộ phụ trách, giảng viên biết để xử lý.</li>
        <li>Vệ sinh máy móc, thiết bị và khu vực thí nghiệm, thực hành vào cuối buổi thí nghiệm, thực hành; bàn giao máy móc thiết bị cho khi sử dụng xong cho cán bộ phụ trách PTN.</li>
        <li>Làm việc nghiêm túc, cẩn thận, không gây mất trật tự trong PTN.</li>
        <li>Ghi, ký xác nhận vào sổ nhật ký PTN chính xác, đầy đủ sau mỗi lần đến làm việc.</li>
      </ol>

      {/* Section IV: Data Access Regulations */}
      <h2 className="text-xl font-bold mt-6 mb-2">IV. QUY ĐỊNH TRUY CẬP DỮ LIỆU</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>Dữ liệu nghiên cứu phải được bảo mật, không chia sẻ thông tin trái phép ra ngoài. Có các biện pháp bảo mật để bảo vệ dữ liệu khỏi các nguy cơ bị lộ hoặc đánh cắp.</li>
        <li>Mỗi thành viên phải sử dụng tài khoản cá nhân để truy cập hệ thống và không được sử dụng tài khoản của người khác. Mật khẩu cần được đổi định kỳ và không chia sẻ với người khác để đảm bảo an toàn thông tin.</li>
      </ol>

      {/* Section V: Responsibilities for Research and Projects */}
      <h2 className="text-xl font-bold mt-6 mb-2">V. TRÁCH NHIỆM CỦA CÁC ĐỐI TƯỢNG NCKH VÀ LÀM ĐỀ TÀI</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>Các chủ nhiệm đề tài NCKH liên hệ trực tiếp với lãnh đạo Trung tâm để được bố trí sử dụng thiết bị phục vụ nghiên cứu.</li>
        <li>Các sinh viên, học viên cao học có nhu cầu nghiên cứu hoặc thực hiện đề tài tại Trung tâm liên hệ trực tiếp với lãnh đạo Trung tâm để được bố trí và hướng dẫn sử dụng thiết bị sau khi được người hướng dẫn khoa học giới thiệu.</li>
        <li>Thống nhất thời gian làm việc tại phòng thí nghiệm.</li>
      </ol>

      {/* Section VI: Violation Handling */}
      <h2 className="text-xl font-bold mt-6 mb-2">VI. XỬ LÝ VI PHẠM</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          Tất cả các trường hợp vi phạm nội quy này đều phải lập biên bản để xử lý theo các hình thức kỷ luật sau:
          <ul className="list-disc pl-6 mt-2">
            <li>Phê bình, cảnh cáo</li>
            <li>Không cho phép làm thí nghiệm, thực hành.</li>
            <li>Xử lý kỷ luật theo quy định của Nhà trường</li>
          </ul>
        </li>
        <li>Khi làm mất, làm hỏng tài sản phải bồi thường theo giá trị tài sản. Mức bồi thường sẽ do Trung tâm Thực hành báo cáo Khoa Công nghệ thông tin, phối hợp các đơn vị chức năng trình Ban Giám hiệu xem xét phê duyệt.</li>
      </ol>

      {/* Footer */}
      <p className="mt-6">
        Nội dung này áp dụng kể từ ngày ký. Các quy định trước đây trái với nội dung này đều được thay thế và bãi bỏ.
      </p>
      <div className="flex justify-end mt-8">
        <div className="text-center">
          <p className="font-bold">HIỆU TRƯỞNG</p>
          <p className="mt-8 font-bold">PGS.TS. Phạm Văn Hồng</p>
        </div>
      </div>
    </div>
  );
};

export default LabRegulation;