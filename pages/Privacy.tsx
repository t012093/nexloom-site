import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold tracking-wide text-primary-700 uppercase">Legal</p>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-900">プライバシーポリシー</h1>
          <p className="mt-3 text-sm text-slate-500">最終更新日: 2026-03-06</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8 text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">1. 取得する情報</h2>
            <p>
              本サービスは、アカウント作成、組織運用、問い合わせ対応のために必要な範囲で、氏名、メールアドレス、所属情報、操作ログ等を取得します。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">2. 利用目的</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>本サービスの提供、本人確認、認証、権限管理のため</li>
              <li>障害対応、品質改善、不正利用防止のため</li>
              <li>重要なお知らせ、規約変更、サポート連絡のため</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">3. ログ・解析情報</h2>
            <p>
              本サービスは、利用状況の把握と安定運用のため、アクセスログ、端末情報、エラー情報等を記録することがあります。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">4. 第三者提供</h2>
            <p>
              法令に基づく場合を除き、本人の同意なく個人情報を第三者へ提供しません。業務委託先へ取り扱いを委託する場合は、適切な管理監督を行います。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">5. 安全管理措置</h2>
            <p>
              不正アクセス、漏えい、改ざん、滅失等を防止するため、アクセス制御、監査ログ、権限分離等の合理的な安全管理措置を講じます。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">6. 開示・訂正・削除等</h2>
            <p>
              本人から自己情報に関する開示、訂正、利用停止、削除等の申し出があった場合、法令に従い適切に対応します。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">7. 改定</h2>
            <p>
              本ポリシーは、法令改正や運用変更に応じて改定されることがあります。重要な変更は、適切な方法で告知します。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
