import React from 'react';
import { Check, X } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '¥0',
      period: '/月',
      description: '個人のタスク管理や、小規模なプロジェクトに最適です。',
      features: [
        'ローカルでの無制限ドキュメント作成',
        '基本チャット機能',
        'AI要約 (月10回まで)',
        'コミュニティサポート',
      ],
      notIncluded: [
        'チーム共有機能',
        'プライベートリポジトリ同期',
        '高度なAIアシスタント',
      ],
      cta: '無料で始める',
      ctaLink: '/download',
      recommended: false,
    },
    {
      name: 'Pro',
      price: '¥1,200',
      period: '/ユーザー/月',
      description: 'チームでのコラボレーションを加速させるスタンダードプラン。',
      features: [
        'Freeプランの全機能',
        '無制限のAI会議録音・要約',
        'チームチャンネルとスレッド',
        'GitHub/Slack連携',
        '優先メールサポート',
      ],
      notIncluded: [
        'SSO (シングルサインオン)',
        '監査ログ',
      ],
      cta: 'Proを試す (14日間無料)',
      ctaLink: '/download',
      recommended: true,
    },
    {
      name: 'Enterprise',
      price: 'Contact',
      period: '',
      description: 'セキュリティと管理機能を重視する大規模組織向け。',
      features: [
        'Proプランの全機能',
        'SAML SSO / SCIM',
        '監査ログと詳細な権限管理',
        '専任のカスタマーサクセス',
        'SLA保証',
      ],
      notIncluded: [],
      cta: 'お問い合わせ',
      ctaLink: '#',
      recommended: false,
    },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            チームの規模に合わせた<br />シンプルな料金プラン
          </h1>
          <p className="text-lg text-slate-600">
            まずは無料で始めて、チームの成長に合わせてプランをお選びください。<br/>
            すべてのプランで、Nexloomの快適な操作性を体験できます。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-sm border p-8 flex flex-col ${
                plan.recommended
                  ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-50 z-10'
                  : 'border-slate-200 hover:border-primary-200 transition-colors'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="inline-block bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                    Recommended
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500 ml-1">{plan.period}</span>
                </div>
                <p className="text-slate-600 text-sm">{plan.description}</p>
              </div>

              <div className="flex-1 mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-3" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start opacity-50">
                      <X className="h-5 w-5 text-slate-400 flex-shrink-0 mr-3" />
                      <span className="text-sm text-slate-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to={plan.ctaLink} className="w-full">
                <Button
                  variant={plan.recommended ? 'primary' : 'outline'}
                  className="w-full justify-center"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500">
            エンタープライズプランの詳細や、オンプレミス版のご相談は
            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium ml-1">
              営業担当までお問い合わせください
            </a>
            。
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;