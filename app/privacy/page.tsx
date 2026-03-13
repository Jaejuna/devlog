import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: 'devlog.의 개인정보처리방침입니다.',
  alternates: {
    canonical: 'https://j-devlog.space/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        개인정보처리방침
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
        최종 업데이트: 2026년 3월 13일
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          1. 개요
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          devlog.（이하 "본 사이트"）는 <strong>https://j-devlog.space</strong>에서 운영되는 개인 기술 블로그입니다.
          운영자(정재준)는 사용자의 개인정보를 소중히 여기며, 본 방침을 통해 수집·이용 현황을 투명하게 안내합니다.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          2. 수집하는 정보
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          본 사이트는 사용자로부터 직접 개인정보를 수집하지 않습니다. 다만, 아래 제3자 서비스가 자동으로 데이터를 수집할 수 있습니다.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>
            <strong>Google Analytics</strong> — 방문 통계(페이지뷰, 체류 시간, 유입 경로 등)를 익명으로 수집합니다.
          </li>
          <li>
            <strong>Google AdSense</strong> — 맞춤형 광고 제공을 위해 쿠키 및 사용자 식별 데이터를 수집합니다.
          </li>
          <li>
            <strong>Upstash Redis</strong> — 게시글 조회수 카운팅 목적으로 요청 처리 시 IP 주소를 일시적으로 사용하나 저장하지 않습니다.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          3. 쿠키(Cookie) 정책
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          본 사이트는 Google AdSense의 맞춤형 광고 제공을 위해 쿠키를 사용합니다.
          쿠키는 사용자의 브라우저에 저장되는 소규모 데이터 파일로, 광고 관련성 향상에 활용됩니다.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>브라우저 설정에서 쿠키를 비활성화할 수 있으나, 일부 기능이 제한될 수 있습니다.</li>
          <li>
            Google의 광고 쿠키 사용에 관한 자세한 내용:{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Google 광고 개인정보 FAQ
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          4. 제3자 서비스 개인정보 처리방침
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Google(Analytics / AdSense) 개인정보처리방침
            </a>
          </li>
          <li>
            <a
              href="https://upstash.com/trust/privacy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Upstash 개인정보처리방침
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          5. 개인정보 보호 권리 및 광고 설정
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Google 광고 설정
            </a>
            에서 맞춤형 광고를 비활성화할 수 있습니다.
          </li>
          <li>브라우저의 쿠키 차단 기능을 통해 추적을 제한할 수 있습니다.</li>
          <li>유럽 경제 지역(EEA) 사용자는 GDPR에 따른 데이터 접근·삭제 권리를 가집니다.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          6. 문의
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          개인정보 처리에 관한 문의 사항은 아래 이메일로 연락해 주세요.
        </p>
        <p className="mt-2">
          <a
            href="mailto:anayana9988@gmail.com"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            anayana9988@gmail.com
          </a>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          7. 방침 변경
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          본 개인정보처리방침은 법령 또는 서비스 변경에 따라 업데이트될 수 있습니다.
          변경 사항은 본 페이지에 게시되며, 상단의 최종 업데이트 날짜가 함께 변경됩니다.
        </p>
      </section>
    </div>
  )
}
