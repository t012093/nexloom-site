import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Apple,
  ArrowRight,
  CheckCircle2,
  Globe,
  Play,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import Button from '../components/Button';
import MobileInstallCard from '../components/MobileInstallCard';
import {
  ANDROID_DOWNLOAD_LABEL,
  ANDROID_DOWNLOAD_URL,
  IOS_DOWNLOAD_LABEL,
  IOS_DOWNLOAD_URL,
  WEB_APP_URL,
} from '../constants/links';

const MobilePage: React.FC = () => {
  const isAndroidDownloadAvailable = Boolean(ANDROID_DOWNLOAD_URL);
  const isIosDownloadAvailable = Boolean(IOS_DOWNLOAD_URL);

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#ffffff_42%,#ecfeff_100%)] pb-24 pt-28">
      <section className="relative">
        <div className="absolute left-1/2 top-0 -z-10 h-[54rem] w-[54rem] -translate-x-1/2 rounded-full bg-cyan-200/20 blur-[140px]" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/85 px-4 py-2 text-sm font-black text-cyan-800 shadow-sm backdrop-blur">
              <Smartphone size={16} />
              <span>Mobile Install</span>
              <span className="text-slate-400">iPhone / Android</span>
            </div>

            <h1 className="mb-6 text-5xl font-black tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              モバイル版を、
              <br />
              <span className="bg-gradient-to-r from-cyan-700 via-sky-600 to-emerald-600 bg-clip-text text-transparent">
                迷わず入れるページにする。
              </span>
            </h1>

            <p className="mb-8 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
              このページは紹介ではなく導入用です。長い説明は削って、iPhone と Android の
              インストール導線だけを短くまとめています。
            </p>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <a href="#install-options" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 w-full rounded-2xl px-8 shadow-xl shadow-cyan-200 sm:w-auto">
                  インストール方法を見る
                </Button>
              </a>
              <a href={WEB_APP_URL} className="w-full sm:w-auto" aria-label="Nexloom Webアプリを開く">
                <Button
                  variant="secondary"
                  size="lg"
                  className="h-14 w-full rounded-2xl border-2 border-slate-200 bg-white/80 px-8 sm:w-auto"
                >
                  Webアプリを開く
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-500">
              <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2">
                iOS {isIosDownloadAvailable ? 'QR available' : 'invite link'}
              </span>
              <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2">
                Android {isAndroidDownloadAvailable ? 'APK ready' : 'preview'}
              </span>
              <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2">
                同じアカウントでログイン
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="relative"
          >
            <div className="rounded-[2.5rem] border border-white/70 bg-white/85 p-7 shadow-[0_38px_90px_-34px_rgba(14,116,144,0.32)] backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">Quick Start</p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">最短で入れる流れ</h2>
                </div>
                <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-700">
                  <ShieldCheck size={22} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-cyan-100 bg-cyan-50/70 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">1. Web account</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    先に Web 版でサインインしておくと、モバイル側ではそのまま同じ組織に入れます。
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="rounded-2xl bg-slate-950 p-3 text-white">
                        <Apple size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">iOS</p>
                        <p className="text-sm font-bold text-slate-900">
                          {isIosDownloadAvailable ? '公開リンクから導入' : 'TestFlight 招待で導入'}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {isIosDownloadAvailable
                        ? 'このページの QR またはボタンから iPhone 側の導線へ進めます。'
                        : '公開リンクはまだ未設定です。招待リンクがある場合だけ TestFlight へ進みます。'}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-emerald-100 bg-white p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="rounded-2xl bg-emerald-600 p-3 text-white">
                        <Play size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Android</p>
                        <p className="text-sm font-bold text-slate-900">
                          {isAndroidDownloadAvailable ? 'このページから直接インストール' : 'preview build を案内'}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {isAndroidDownloadAvailable
                        ? 'Pixel を含む Android 端末では、固定 URL の APK を QR またはボタンから開けます。'
                        : 'APK の公開 URL がまだ無い場合は、配布案内に沿って導入します。'}
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">2. Install on device</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    PC でこのページを開いているなら QR、端末で見ているならボタンからそのまま進んでください。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="install-options" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-cyan-700">Install Options</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              端末ごとの導線だけを、短く。
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              iPhone は TestFlight、Android は APK 直配布を前提にしています。公開リンクがある端末だけ
              QR を表示し、無い導線は無理に見せません。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <MobileInstallCard
              platform="ios"
              icon={Apple}
              status={isIosDownloadAvailable ? 'Ready now' : 'Invite required'}
              title={isIosDownloadAvailable ? 'iPhone / iPad に入れる' : 'iPhone / iPad は TestFlight 招待で導入'}
              description={
                isIosDownloadAvailable
                  ? '公開 TestFlight または App Store リンクがある場合は、このページからそのまま開けます。'
                  : '公開リンクはまだ設定していません。配布案内を受け取っているメンバーだけが TestFlight へ進めます。'
              }
              steps={
                isIosDownloadAvailable
                  ? [
                      'iPhone / iPad で QR を読むか、このページのボタンからリンクを開く',
                      '表示された TestFlight または App Store の導線に従ってインストールする',
                      'Web 版と同じアカウントでログインする',
                    ]
                  : [
                      'チームから iOS の配布案内を受け取る',
                      'App Store で TestFlight を入れる',
                      '招待リンクから Nexloom beta を開いてインストールする',
                    ]
              }
              label={IOS_DOWNLOAD_LABEL}
              note={
                isIosDownloadAvailable
                  ? 'iOS の QR は公開リンクがあるときだけ出します。ダミー QR は置きません。'
                  : '公開 TestFlight リンクが用意できたら、このカードにも QR を自動で表示できます。'
              }
              url={IOS_DOWNLOAD_URL}
              ctaLabel={isIosDownloadAvailable ? 'iOS の導線を開く' : undefined}
              qrTitle="iPhone / iPad で開く"
              qrCaption="PC で開いている場合は、iPhone 側で QR を読み取って TestFlight または配布ページへ進みます。"
            />

            <MobileInstallCard
              platform="android"
              icon={Play}
              status={isAndroidDownloadAvailable ? 'Direct download' : 'Preview'}
              title={isAndroidDownloadAvailable ? 'Android APK を直接インストール' : 'Android preview build を案内'}
              description={
                isAndroidDownloadAvailable
                  ? 'このページのボタンまたは QR から固定 URL の APK を開けます。配布リンク切れを避けるため、短命な artifact URL は使っていません。'
                  : 'Android の公開 URL が無い場合は、preview build の配布案内に沿って導入します。'
              }
              steps={
                isAndroidDownloadAvailable
                  ? [
                      'Android 端末で QR を読むか、このページのボタンから APK を開く',
                      '初回のみ、必要に応じて提供元不明アプリの許可を確認する',
                      'インストール後に Web 版と同じアカウントでログインする',
                    ]
                  : [
                      '配布された Android preview build を受け取る',
                      '必要な場合のみ APK インストールの許可を有効にする',
                      'インストールしてログインする',
                    ]
              }
              label={ANDROID_DOWNLOAD_LABEL}
              note={
                isAndroidDownloadAvailable
                  ? 'Pixel ではこのページからそのまま導入できます。'
                  : 'Android の direct URL が用意できたら、このカードの QR とボタンが有効になります。'
              }
              url={ANDROID_DOWNLOAD_URL}
              ctaLabel={isAndroidDownloadAvailable ? 'Android APK をダウンロード' : undefined}
              qrTitle="Android 端末で開く"
              qrCaption="PC でこのページを開き、Pixel などの Android 端末で QR を読み取って APK ページへ進みます。"
            />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                <Globe size={22} />
              </div>
              <h3 className="text-lg font-black text-slate-900">先に Web で入る</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                アカウント確認や組織参加は Web 版が最短です。モバイルはそのあとに足す方が迷いません。
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-lg font-black text-slate-900">Android は初回だけ確認</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                APK 直配布では、端末設定でインストール許可が必要になることがあります。常時ではなく初回だけです。
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <CheckCircle2 size={22} />
              </div>
              <h3 className="text-lg font-black text-slate-900">同じチーム文脈で使う</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Web、デスクトップ、モバイルでアカウントは共通です。入り口だけ違っても、作業の続きは同じです。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.75rem] bg-slate-950 p-10 text-white shadow-[0_40px_120px_-36px_rgba(15,23,42,0.72)] md:p-14">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-cyan-500/20 to-transparent" />
            <div className="relative z-10 max-w-3xl">
              <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-cyan-300">Fallback</p>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                まず使い始めるだけなら、
                <br />
                Web がいちばん速いです。
              </h2>
              <p className="mb-8 mt-5 text-lg leading-relaxed text-slate-300">
                モバイル導入前でも、Web 版からそのまま始められます。配布リンクが未整備の端末は Web を正規入口にしてください。
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a href={WEB_APP_URL} className="w-full sm:w-auto" aria-label="Nexloom Webアプリを開く">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="h-14 w-full rounded-2xl border-white bg-white px-8 text-slate-900 sm:w-auto"
                  >
                    Webで今すぐ始める
                  </Button>
                </a>
                <Link to="/download" className="w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="h-14 w-full rounded-2xl border border-white/20 px-8 text-white hover:bg-white/10 sm:w-auto"
                  >
                    デスクトップ版を見る
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobilePage;
