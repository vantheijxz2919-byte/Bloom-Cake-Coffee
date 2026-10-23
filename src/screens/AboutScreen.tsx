import React from 'react';
import { useApp } from '../context/AppContext';

export const AboutScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();

  return (
    <div className="flex flex-col w-full">
      {/* Brand Manifest Hero */}
      <section className="relative w-full overflow-hidden bg-surface-container-low py-16 lg:py-24">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"></div>
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed shadow-sm">
                <img
                  src="/assets/aistudio/image_409_9964af08.png"
                  alt="Bloom Logo"
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-primary/40"
                />
                <span className="font-label-sm text-xs uppercase tracking-wider font-bold">
                  Gastro Pop Heritage • Đà Nẵng Since 2018
                </span>
              </div>
              <h1 className="font-headline-lg text-4xl lg:text-5xl text-on-surface tracking-tight leading-tight">
                <span className="font-display-custom font-bold">Khi Kỹ Thuật Bánh Pháp Gặp Gỡ</span>{' '}
                <span className="font-script text-black text-5xl lg:text-6xl inline-block px-1 font-normal">
                  Tinh Hoa Uji
                </span>{' '}
                <span className="font-display-custom font-bold">Giữa Lòng Thành Phố Biển</span>
              </h1>
              <p className="font-body-lg text-base text-on-surface-variant max-w-2xl leading-relaxed">
                Bloom Cake &amp; Coffe ra đời từ giấc mơ gói trọn nắng vàng Mỹ Khê, ngọn gió biển lộng lẫy cùng sự khắt khe của trường phái bánh nướng thủ công nước Pháp. Một phong cách ẩm thực tươi mới, nơi từng thớ ngàn lớp giòn rụm tỏa ngát hương bơ thượng hạng và bọt matcha Kyoto sóng sánh xanh mướt.
              </p>

              {/* Interactive Highlights */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setCurrentScreen('menu')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-on-primary font-label-lg text-xs font-bold shadow-[0_8px_20px_rgba(255,51,102,0.24)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Khám Phá Menu Mẻ Mới</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => setCurrentScreen('branches')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface-container text-on-surface font-label-lg text-xs font-bold hover:bg-surface-variant transition-all cursor-pointer border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-[20px] text-primary">storefront</span>
                  <span>Hệ Thống 6 Cơ Sở</span>
                </button>
              </div>

              {/* Mini Key Stats Bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-outline-variant/30">
                <div>
                  <p className="font-headline-lg text-2xl lg:text-3xl text-primary font-bold">100%</p>
                  <p className="font-label-sm text-[10px] text-on-surface-variant uppercase mt-1 font-bold">
                    Bơ Elle &amp; Vire AOP
                  </p>
                </div>
                <div>
                  <p className="font-headline-lg text-2xl lg:text-3xl text-secondary font-bold">06:30</p>
                  <p className="font-label-sm text-[10px] text-on-surface-variant uppercase mt-1 font-bold">
                    Mẻ Bánh Đầu Ngày
                  </p>
                </div>
                <div>
                  <p className="font-headline-lg text-2xl lg:text-3xl text-on-surface font-bold">30'</p>
                  <p className="font-label-sm text-[10px] text-on-surface-variant uppercase mt-1 font-bold">
                    Ship Nóng Resort
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Mosaic Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[460px]">
                <div className="w-full h-[460px] rounded-3xl overflow-hidden shadow-2xl bg-surface-container border border-outline-variant/30">
                  <img
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
                    alt="Bếp bánh thủ công Bloom Cake Đà Nẵng"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhGR1T64bXu74-T6dwkji_R0dgzlkc23TnQcR4axvqZgaWjrmsVoBWPhtxjv5aYZYo8W9En3MI9e-yeDQ-KwLDWhRBK6JFJ-cr8nug8JWi5Gr2N03kc5IKFSRhdahUYjvvEJcOoV2TatIvgcYQKd89kHsrk-pXa2vQW1t0Nt9G-z2ux7UU7PdU6dmgafVxhJtgDWUMi6xSmQt2yR7td29bLel5pLWs9PunQCQKnpcbMHyRo84WJx0"
                  />
                </div>
                {/* Overlapping Floating Pop Card */}
                <div className="absolute -bottom-8 -left-6 bg-surface-container-lowest p-5 rounded-2xl shadow-xl max-w-[240px] transform -rotate-2 hover:rotate-0 transition-transform border border-outline-variant/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                      <span className="material-symbols-outlined text-[22px]">eco</span>
                    </div>
                    <div>
                      <p className="font-label-sm text-[10px] uppercase text-on-surface-variant font-bold">Kyoto Direct</p>
                      <p className="font-headline-sm text-sm text-secondary font-bold">Uji Matcha</p>
                    </div>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-snug">
                    Trà xuân thượng hạng đánh Chasen tạo bọt ngọc bích sánh mịn.
                  </p>
                </div>
                {/* Floating Sticker */}
                <div className="absolute -top-5 -right-4 bg-primary text-on-primary px-4 py-2 rounded-full font-label-md text-xs font-bold shadow-lg rotate-6 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                  <span>Nướng Lò Liên Tục</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gastro Pop Philosophy Section */}
      <section className="w-full py-20 bg-surface">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="font-label-md text-xs tracking-widest text-primary font-bold uppercase bg-primary-fixed/60 px-4 py-1 rounded-full">
              Triết Lý Thương Hiệu
            </span>
            <h2 className="font-headline-lg text-3xl lg:text-4xl text-on-surface pt-2 leading-snug">
              <span className="font-script text-black text-4xl md:text-5xl block pb-1 font-normal">Gastro Pop</span>{' '}
              <span className="font-display-custom font-bold">Sự Giao Thoa Giữa Kỷ Luật Cổ Điển &amp; Năng Lượng Nhiệt Đới</span>
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Chúng tôi không phục vụ những chiếc bánh đại trà đông lạnh. Tại Bloom Cake Đà Nẵng, mỗi mẻ nướng là một buổi trình diễn sống động tôn vinh tay nghề thủ công, sự hào phóng của thiên nhiên biển cả và nụ cười rạng rỡ của người làm nghề.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Bento 1 */}
            <div className="md:col-span-7 bg-surface-container-low rounded-3xl p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden group border border-outline-variant/30">
              <div className="space-y-4 relative z-10">
                <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold">
                  Trường Phái Bánh Pháp Cổ Điển
                </span>
                <h3 className="font-headline-md text-xl text-on-surface font-bold">
                  Kỹ Thuật Cán Lớp Chuẩn Xác &amp; Bột Mì T55 Nhập Khẩu
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant max-w-lg leading-relaxed">
                  Kỹ thuật ngàn lớp lamination 27 lớp tiêu chuẩn Pháp. Từng khối bơ nguyên chất Elle &amp; Vire AOP tan chảy chậm rãi giữa các màng bột ủ lạnh 48 giờ, tạo nên độ phồng rỗng xốp tổ ong hoàn mỹ và tiếng rôm rốp thỏa mãn khi bẻ đôi.
                </p>
              </div>
              <div className="pt-8 relative z-10 flex items-center gap-3 text-primary font-label-md text-xs font-bold">
                <span className="w-8 h-0.5 bg-primary"></span>
                <span>Nướng tại nhiệt độ 195°C mỗi 45 phút</span>
              </div>
              <div className="absolute right-0 bottom-0 w-64 h-64 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <span className="material-symbols-outlined text-[240px] text-on-surface">bakery_dining</span>
              </div>
            </div>

            {/* Bento 2 */}
            <div className="md:col-span-5 bg-secondary-container/40 rounded-3xl p-8 lg:p-10 flex flex-col justify-between border border-secondary/20">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">spa</span>
                </div>
                <h3 className="font-headline-md text-lg text-on-surface font-bold">
                  Matcha Vụ Xuân Hái Tay Từ Vườn Trà Uji Kyoto
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  Không dùng bột tạo màu hay hương liệu công nghiệp. Bloom Cake tuyển chọn dòng trà Ceremonial &amp; Premium Harvest xay cối đá granite, thơm nức hương cỏ non ngọt ngào, hậu vị umami lắng đọng.
                </p>
              </div>
              <div className="pt-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface text-secondary font-label-sm text-xs font-bold shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  Đánh chổi Chasen tươi theo từng order
                </div>
              </div>
            </div>

            {/* Bento 3 */}
            <div className="md:col-span-5 bg-surface-container rounded-3xl p-8 lg:p-10 flex flex-col justify-between border border-outline-variant/30">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">sunny</span>
                </div>
                <h3 className="font-headline-md text-lg text-on-surface font-bold">
                  Hồn Biển Đà Nẵng Phóng Khoáng
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  Tâm thế người miền Trung chân chất hào sảng. Chúng tôi đem nắng hè, dừa non xiêm, xoài cát Hòa Lộc và muối biển Sa Huỳnh kết hợp vào những chiếc bánh tart, entremet hiện đại.
                </p>
              </div>
              <div className="pt-6 font-label-md text-xs text-primary font-bold flex items-center gap-1.5">
                <span>Nguyên liệu bản địa tươi mới quanh năm</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>

            {/* Bento 4 */}
            <div className="md:col-span-7 bg-surface-container-highest rounded-3xl overflow-hidden relative min-h-[260px] border border-outline-variant/30">
              <img
                className="w-full h-full object-cover"
                alt="Không gian tiệm bánh Bloom Cake Đà Nẵng"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtyaWxEcZZP9OLMzv3MJo7Agd81Wk4KGNwjFcx4ueHHVOxD387geTs5yATELpgqqKp6qFih5ddAQKnQk0gByXoiEDKNmAVV0oXMoZXNLkgytBKB5A3hqel2ABCPbBBIMWpHv1F0MrTJSPiwK5BYAlXtxk68GRp3Zg9ri0O4ubMRQmCQv4xgmrU7UFN8mRj6P6sLi9p8zqZPtkQWpBVdo6YCf8odP-lCvczxoimkkdHkwdiaYkPyZk"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/20 to-transparent p-8 flex flex-col justify-end">
                <span className="text-surface font-label-sm text-xs uppercase tracking-widest font-bold">
                  Không Gian Trải Nghiệm Mở
                </span>
                <p className="text-surface font-headline-sm text-base font-bold mt-1">
                  Cửa kính trong suốt ngắm nhìn trọn vẹn thao tác của nghệ nhân làm bánh
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Values */}
      <section className="w-full py-20 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold">
                Cam Kết Bền Vững
              </span>
              <h2 className="font-headline-lg text-3xl lg:text-4xl text-on-surface mt-2 font-bold">
                3 Giá Trị Cốt Lõi Tạo Nên Danh Tiếng Bloom Cake
              </h2>
            </div>
            <p className="font-body-md text-sm text-on-surface-variant max-w-md leading-relaxed">
              Mỗi ngày thức dậy từ 05:30 sáng, toàn bộ thợ bánh và barista chỉ theo đuổi một mục tiêu: sự trọn vẹn trong trải nghiệm vị giác của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30">
              <div className="w-16 h-16 rounded-2xl bg-primary-fixed/50 text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[34px]">award_star</span>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-xs mb-3 font-bold">
                Giá Trị 01
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-3 font-bold">
                100% Nguyên Liệu Thượng Hạng
              </h3>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                Nói không tuyệt đối với shortening, dầu cọ tái chế, chất tạo xốp hóa học hay bột kem béo tổng hợp. Chúng tôi chỉ tin dùng bơ nguyên chất Elle &amp; Vire AOP nhập từ Normandy nước Pháp, sữa tươi thanh trùng Đà Lạt và matcha vụ xuân hái tay Kyoto.
              </p>
              <ul className="mt-6 space-y-2 border-t border-surface-container pt-4 font-body-sm text-xs text-on-surface font-semibold">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span>Độ tinh khiết và an toàn đạt chuẩn quốc tế</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span>Tươi ngọt thanh, không cảm giác gắt cổ</span>
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30">
              <div className="w-16 h-16 rounded-2xl bg-secondary-fixed/50 text-secondary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[34px]">oven_gen</span>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-xs mb-3 font-bold">
                Giá Trị 02
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-3 font-bold">
                Bánh Nướng Mẻ Mới Liên Tục Mỗi Ngày
              </h3>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                Lò nướng bật sáng từ 06:30 sáng tại trung tâm mỗi cơ sở. Từng khay Croissant, Pain au Chocolat, Danish trái cây được canh chỉnh canh giờ chính xác. Bánh luôn thơm nức hương bơ nóng, giòn tan khi khách vừa chạm môi.
              </p>
              <ul className="mt-6 space-y-2 border-t border-surface-container pt-4 font-body-sm text-xs text-on-surface font-semibold">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span>Quy trình nướng bổ sung 3 ca/ngày</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span>Bánh tồn trong ngày được xử lý quy chuẩn</span>
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30">
              <div className="w-16 h-16 rounded-2xl bg-primary-fixed/50 text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[34px]">moped</span>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-xs mb-3 font-bold">
                Giá Trị 03
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-3 font-bold">
                Lòng Hiếu Khách &amp; Đồng Hành Cùng Du Khách
              </h3>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                Đà Nẵng níu chân du khách bằng sự chân thành, và Bloom Cake cũng vậy. Hỗ trợ giao tận sảnh resort, khách sạn ven biển trong 30 phút. Hộp quà mang về thiết kế thanh lịch kèm túi giữ nhiệt, bảo đảm độ giòn thơm nguyên vẹn sau chuyến bay.
              </p>
              <ul className="mt-6 space-y-2 border-t border-surface-container pt-4 font-body-sm text-xs text-on-surface font-semibold">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span>Đóng gói chống sốc và chống ẩm độc quyền</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span>Viết thiệp chúc mừng sinh nhật miễn phí</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Artisans & Tea Sommeliers */}
      <section className="w-full py-20 bg-surface">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-label-sm text-xs uppercase tracking-wider text-secondary font-bold">
              Những Bàn Tay Kiến Tạo Kỳ Diệu
            </span>
            <h2 className="font-headline-lg text-3xl lg:text-4xl text-on-surface font-bold">
              Pastry Chefs &amp; Tea Sommeliers
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant">
              Gặp gỡ những người giữ lửa cho hương vị Bloom Cake: am hiểu từng gram bột, cảm nhận từng độ ẩm không khí Đà Nẵng và trân quý từng búp trà xanh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            {/* Chef Minh Nguyen */}
            <div className="bg-surface-container-low rounded-3xl p-8 lg:p-10 flex flex-col sm:flex-row gap-6 items-center border border-outline-variant/30">
              <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0 bg-surface-container shadow-md border-2 border-white">
                <img
                  className="w-full h-full object-cover"
                  alt="Bếp trưởng Minh Nguyễn"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn4RWfHm5Y4-WBpFCk3kp2TLxKbR3S0kJlW-MdkKv5aC_Nk82ChjLg1WwmjaxS0My89J-_P5-SOFLRFG6m3nuvm0XolAiYDwG6yWoyPbwzvFgYx-0HS0QQ-DYjXzEbvR_H6sggig1-1dIMj0IgGyN1EiJ0_0hlYsW_b6WkX24JWepYEGk4cJIczcxOHeJmBsJyTD2ldg7Q05PAYwGzFdlyVG05ylYm9ApDtAvbpdVULSTjo4vL2VY"
                />
              </div>
              <div className="space-y-3 text-center sm:text-left">
                <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold">
                  Bếp Trưởng Điều Hành
                </span>
                <h3 className="font-headline-md text-xl text-on-surface font-bold">Chef Minh Nguyễn</h3>
                <p className="font-body-sm text-xs text-secondary font-semibold">
                  12 Năm Kinh Nghiệm Trường Phái Pastry Pháp
                </p>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Từng tu nghiệp tại Lyon và phụ trách bánh cao cấp tại các resort 5 sao biển miền Trung. Anh luôn tâm niệm: “Bánh ngon phải có linh hồn của sự kiên nhẫn và độ chính xác tính bằng từng giây khi mở nắp lò”.
                </p>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-[11px] font-semibold">
                    Croissant Master
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-[11px] font-semibold">
                    Sourdough Lover
                  </span>
                </div>
              </div>
            </div>

            {/* Sommelier Ha Le */}
            <div className="bg-surface-container-low rounded-3xl p-8 lg:p-10 flex flex-col sm:flex-row gap-6 items-center border border-outline-variant/30">
              <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0 bg-surface-container shadow-md border-2 border-white">
                <img
                  className="w-full h-full object-cover"
                  alt="Chuyên gia trà đạo Hà Lê"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX9UmmSmpnhtFQVRpzJm2OMyuWkvk0P9xAwfDXz8jUMezrycuAuO5P77nj55Fd-F0irIisa4ooReQzo9h-jfPJy77HKtiZNdiK4xmV_mU_b0uMcqMniHc3ogSPNndWJ1RJEGj_y94b9dY5CaKx96w_rnEjUcY-S-5nL13aoR0AlkwfGPNEMrj3guLesEfZ1gGDoP8mtUShFVcBSWDhqUd5Fv67e2WpCUxVbFmRDmUG0dwdpmJcB1o"
                />
              </div>
              <div className="space-y-3 text-center sm:text-left">
                <span className="font-label-sm text-xs uppercase tracking-wider text-secondary font-bold">
                  Chuyên Gia Trà Đạo
                </span>
                <h3 className="font-headline-md text-xl text-on-surface font-bold">Sommelier Hà Lê</h3>
                <p className="font-body-sm text-xs text-secondary font-semibold">
                  Nghiên Cứu Trà Uji Kyoto &amp; Trà Thảo Mộc Bản Địa
                </p>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Trực tiếp sang các nông trường tại Uji, Kyoto để chọn lọc các loại trà phù hợp nhất khi kết hợp cùng lớp kem bơ pastry béo ngậy. Đôi tay khéo léo của chị tạo nên lớp bọt ngọc bích mịn màng đánh thức mọi giác quan.
                </p>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-[11px] font-semibold">
                    Chasen Specialist
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-[11px] font-semibold">
                    Matcha Pairing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Timeline Section */}
      <section className="w-full py-20 bg-surface-container">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold">
              Hành Trình Khát Vọng
            </span>
            <h2 className="font-headline-lg text-3xl text-on-surface font-bold">
              Từ Góc Bếp Nhỏ Hàm Nghi Đến 6 Điểm Hẹn Nắng Gió
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant">
              Hành trình 6 năm không ngừng nâng chuẩn chất lượng để trở thành thương hiệu bánh ngọt biểu tượng của thành phố Đà Nẵng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-outline-variant/30">
              <div>
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm mb-4 shadow-md">
                  2018
                </div>
                <h4 className="font-headline-sm text-base text-on-surface mb-2 font-bold">Góc Bếp Đầu Tiên</h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Khởi đầu tại 784 Hàm Nghi với chiếc lò nướng 2 tầng và niềm say mê mang hương vị croissant bơ Pháp đích thực đến người dân Đà Nẵng.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-surface-container font-label-sm text-[11px] text-primary font-bold">
                • Ra mắt dòng Bánh Bơ Tươi
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-outline-variant/30">
              <div>
                <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm mb-4 shadow-md">
                  2020
                </div>
                <h4 className="font-headline-sm text-base text-on-surface mb-2 font-bold">Đón Sóng Uji Matcha</h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Mở rộng cơ sở 242 Bạch Đằng nhìn ngắm Cầu Rồng và bắt tay hợp tác trực tiếp với các đồn điền trà Kyoto, ra đời concept Gastro Pop rực rỡ.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-surface-container font-label-sm text-[11px] text-secondary font-bold">
                • Dòng Matcha Latte Chasen
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-outline-variant/30">
              <div>
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm mb-4 shadow-md">
                  2022
                </div>
                <h4 className="font-headline-sm text-base text-on-surface mb-2 font-bold">Tiến Ra Bờ Biển Mỹ Khê</h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Hiện diện tại Võ Văn Kiệt và Võ Nguyên Giáp. Dịch vụ Bloom Express 30 phút giao nóng tận resort biển trở thành điểm cộng lớn cho du khách.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-surface-container font-label-sm text-[11px] text-primary font-bold">
                • Dịch vụ Resort Delivery
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-outline-variant/30">
              <div>
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm mb-4 shadow-md">
                  Hôm Nay
                </div>
                <h4 className="font-headline-sm text-base text-on-surface mb-2 font-bold">6 Điểm Đến Biểu Tượng</h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Phục vụ hơn 1.500 lượt khách mỗi ngày khắp 6 cơ sở, trở thành món quà check-in không thể bỏ lỡ khi ghé thăm thành phố Đà Nẵng.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-surface-container font-label-sm text-[11px] text-primary font-bold">
                • Quà Lưu Niệm Đóng Hộp Cao Cấp
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Invitation Callout */}
      <section className="w-full py-20 bg-surface">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="bg-primary-container text-on-primary-container rounded-3xl p-8 lg:p-14 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary-fixed/20 blur-2xl pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-on-primary-container font-label-sm text-xs font-bold uppercase tracking-wider">
                  Lời Mời Ngọt Ngào Từ Đà Nẵng
                </span>
                <h2 className="font-display-lg text-3xl lg:text-4xl font-bold leading-tight">
                  Đến Đà Nẵng, Đừng Quên Ghé Thăm Mùi Bánh Mới Của Bloom Cake
                </h2>
                <p className="font-body-lg text-base text-white/90 max-w-2xl leading-relaxed">
                  Dù bạn đang dạo bước bên bờ sông Hàn thơ mộng hay đang tận hưởng làn gió mặn mà tại bãi biển Mỹ Khê, luôn có một góc Bloom Cake ấm áp, ngát hương bơ và sẵn sàng phục vụ tách trà tươi nhất cho bạn.
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <button
                    onClick={() => setCurrentScreen('branches')}
                    className="px-8 py-3.5 rounded-full bg-surface text-on-surface font-label-lg text-xs font-bold shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-primary text-[20px]">map</span>
                    <span>Xem Bản Đồ 6 Chi Nhánh</span>
                  </button>
                  <button
                    onClick={() => setCurrentScreen('menu')}
                    className="px-8 py-3.5 rounded-full bg-white/10 border border-white/30 text-white font-label-lg text-xs font-bold hover:bg-white/20 transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                    <span>Đặt Bánh Giao Khách Sạn</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 bg-white/10 backdrop-blur-md p-6 rounded-2xl text-white border border-white/20">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[28px]">schedule</span>
                  <div>
                    <p className="font-label-md text-xs font-bold">Giờ Nướng &amp; Mở Cửa</p>
                    <p className="font-body-sm text-xs text-white/80">07:00 - 22:30 (Cả tuần)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-t border-white/20 pt-3">
                  <span className="material-symbols-outlined text-[28px]">support_agent</span>
                  <div>
                    <p className="font-label-md text-xs font-bold">Hotline Điều Phối Nhanh</p>
                    <p className="font-body-sm text-xs text-white/80">1900 8899 (Hỗ trợ tiếng Anh &amp; Việt)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-t border-white/20 pt-3">
                  <span className="material-symbols-outlined text-[28px]">card_giftcard</span>
                  <div>
                    <p className="font-label-md text-xs font-bold">Quà Du Lịch Đóng Hộp</p>
                    <p className="font-body-sm text-xs text-white/80">Miễn phí túi xách quà tặng &amp; đá gel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
