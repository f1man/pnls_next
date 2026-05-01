
"use client";

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const lang = params.lang === 'ja' ? 'ja' : 'ko';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const switchLang = (newLang: 'ko' | 'ja') => {
    if (newLang === lang) return;
    const currentPath = pathname || `/${lang}`;
    const newPathname = currentPath.replace(`/${lang}`, `/${newLang}`);
    router.push(newPathname);
  };

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
      setIsSubmitting(false);
      setTimeout(() => {
          const successEl = document.getElementById('formSuccess');
          if (successEl) successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }, 1200);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeMenu();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const t = (kr: string, jp: string) => lang === 'ja' ? jp : kr;
  const th = (kr: string, jp: string) => lang === 'ja' ? <span dangerouslySetInnerHTML={{__html: jp}} /> : <span dangerouslySetInnerHTML={{__html: kr}} />;

  return (
    <>
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <a href="#hero" className="logo" onClick={(e) => scrollToSection(e, '#hero')} style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/images/logo.png" alt="P&L Solution" width={240} height={60} style={{ objectFit: 'contain', height: '40px', width: 'auto' }} priority />
          </a>

          <ul className="nav-links" id="navLinks">
            <li><a href="#about" onClick={(e) => scrollToSection(e, '#about')}>{t('회사소개', '会社紹介')}</a></li>
            <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')}>{t('서비스', 'サービス')}</a></li>
            <li><a href="#cases" onClick={(e) => scrollToSection(e, '#cases')}>{t('구축사례', '導入実績')}</a></li>
            <li><a href="#japan-business" onClick={(e) => scrollToSection(e, '#japan-business')}>{t('일본 비즈니스', '日本ビジネス')}</a></li>
            <li><a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>{t('견적문의', 'お問い合わせ')}</a></li>
          </ul>

          <div className="nav-right">
            <div className="lang-toggle">
              <button className={`lang-btn ${lang === 'ko' ? 'active' : ''}`} onClick={() => switchLang('ko')}>한국어</button>
              <button className={`lang-btn ${lang === 'ja' ? 'active' : ''}`} onClick={() => switchLang('ja')}>日本語</button>
            </div>
            <a href="#contact" className="btn-contact-nav" onClick={(e) => scrollToSection(e, '#contact')}>{t('무료 견적문의', '無料相談')}</a>
          </div>

          <button className="hamburger" id="hamburger" onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} id="mobileMenu">
        <a href="#about" onClick={(e) => scrollToSection(e, '#about')}>{t('회사소개', '会社紹介')}</a>
        <a href="#services" onClick={(e) => scrollToSection(e, '#services')}>{t('서비스', 'サービス')}</a>
        <a href="#cases" onClick={(e) => scrollToSection(e, '#cases')}>{t('구축사례', '導入実績')}</a>
        <a href="#japan-business" onClick={(e) => scrollToSection(e, '#japan-business')}>{t('일본 비즈니스', '日本ビジネス支援')}</a>
        <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>{t('견적문의', 'お問い合わせ')}</a>
        <div className="mobile-menu-actions">
          <div className="lang-toggle">
            <button className={`lang-btn ${lang === 'ko' ? 'active' : ''}`} onClick={() => switchLang('ko')}>한국어</button>
            <button className={`lang-btn ${lang === 'ja' ? 'active' : ''}`} onClick={() => switchLang('ja')}>日本語</button>
          </div>
        </div>
      </div>

      <section id="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">{t('IT 인프라 전문기업 · 서울', 'ITインフラ専門企業 · ソウル')}</div>

            <h1 className="hero-title">{th('IT 인프라의 설계부터 운영까지,<br>기업의 안정적인<br>비즈니스를 지원합니다.', 'ITインフラの設計から運用まで、<br>企業の安定した<br>ビジネスを支援します。')}</h1>

            <p className="hero-desc">{th('피엔엘솔루션(주)은 서버, 네트워크, 보안, 클라우드, 유지보수 분야의<br>경험을 바탕으로 고객사의 IT 환경을 안정적으로 구축하고 운영합니다.', 'P&Lソリューションは、サーバー、ネットワーク、セキュリティ、<br>クラウド、保守運用の経験をもとに、<br>お客様のIT環境を安定的に構築・運用します。')}</p>

            <div className="hero-actions">
              <a href="#contact" className="btn-primary" onClick={(e) => scrollToSection(e, '#contact')}>{t('▶ 무료 견적문의', '▶ 無料でご相談')}</a>
              <a href="#services" className="btn-secondary" onClick={(e) => scrollToSection(e, '#services')}>{t('서비스 알아보기', 'サービスを見る')}</a>
            </div>

            <div className="hero-tags">
              <span className="hero-tag">{t('🖥 서버 구축', '🖥 サーバー構築')}</span>
              <span className="hero-tag">{t('🌐 네트워크', '🌐 ネットワーク')}</span>
              <span className="hero-tag">{t('🔒 보안 솔루션', '🔒 セキュリティ')}</span>
              <span className="hero-tag">{t('☁️ 클라우드', '☁️ クラウド')}</span>
              <span className="hero-tag">{t('🛠 유지보수', '🛠 保守運用')}</span>
            </div>

            <div className="hero-cards">
              <div className="hero-card">
                <div className="hero-card-icon">🖥</div>
                <div className="hero-card-title">{t('서버 인프라 구축', 'サーバーインフラ構築')}</div>
                <div className="hero-card-desc">{t('온프레미스·클라우드·하이브리드 서버 설계 및 구축', 'オンプレミス・クラウド・ハイブリッドサーバーの設計・構築')}</div>
              </div>
              <div className="hero-card">
                <div className="hero-card-icon">🌐</div>
                <div className="hero-card-title">{t('네트워크 설계', 'ネットワーク設計')}</div>
                <div className="hero-card-desc">{t('기업 규모에 맞는 최적화된 네트워크 아키텍처 구현', '企業規模に合わせた最適なネットワークアーキテクチャの実現')}</div>
              </div>
              <div className="hero-card">
                <div className="hero-card-icon">🔒</div>
                <div className="hero-card-title">{t('보안 솔루션', 'セキュリティソリューション')}</div>
                <div className="hero-card-desc">{t('방화벽·VPN·접근제어 등 통합 보안 환경 구성', 'ファイアウォール・VPN・アクセス制御など統合セキュリティ環境の構築')}</div>
              </div>
              <div className="hero-card">
                <div className="hero-card-icon">🇯🇵</div>
                <div className="hero-card-title">{t('일본 IT 비즈니스 지원', '日本ITビジネス支援')}</div>
                <div className="hero-card-desc">{t('일한 이중 언어 지원으로 일본 시장 IT 도입을 원스톱 지원', '日韓バイリンガル対応で日本市場のIT導入をワンストップ支援')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="stats-band">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-num">25<span>+</span></div>
              <div className="stat-label">{t('년 IT 인프라 경력', '年のITインフラ経験')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">100<span>+</span></div>
              <div className="stat-label">{t('고객사 구축 실적', '顧客企業への導入実績')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">99.99<span>%</span></div>
              <div className="stat-label">{t('시스템 가동률 보장', 'システム稼働率保証')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">24<span>/7</span></div>
              <div className="stat-label">{t('긴급 대응 체계 운영', '緊急対応体制運営')}</div>
            </div>
          </div>
        </div>
      </div>

      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual fade-up">
              <div className="about-main-card">
                <div className="about-card-tag">{t('OUR STRENGTH', '私たちの強み')}</div>
                <h3 className="about-card-title">{th('신뢰할 수 있는 IT 파트너,<br>피엔엘솔루션(주)', '信頼できるITパートナー、<br>P&Lソリューション')}</h3>
                <div className="about-strengths">
                  <div className="about-strength-item">
                    <div className="strength-icon">🏆</div>
                    <div className="strength-text">{t('25년+ 검증된 기술력과 풍부한 구축 경험', '25年以上の検証された技術力と豊富な構築経験')}</div>
                  </div>
                  <div className="about-strength-item">
                    <div className="strength-icon">🤝</div>
                    <div className="strength-text">{t('한국·일본 이중 언어 전담 지원 체계', '韓国・日本バイリンガル専任サポート体制')}</div>
                  </div>
                  <div className="about-strength-item">
                    <div className="strength-icon">⚡</div>
                    <div className="strength-text">{t('도입부터 유지보수까지 원스톱 서비스', '導入から保守運用までワンストップサービス')}</div>
                  </div>
                </div>
              </div>
              <div className="about-floating">
                <div className="floating-num">99.99<span>%</span></div>
                <div className="floating-label">
                  <div>{t('고객 만족도', '顧客満足度')}</div>
                  <div style={{fontSize: "11px", color: "var(--gray-400)"}}>{t('2024 기준', '2024年基準')}</div>
                </div>
              </div>
            </div>

            <div className="about-content fade-up">
              <div className="section-tag">{t('COMPANY', 'COMPANY')}</div>
              <h2 className="section-title">{t('피엔엘솔루션(주)을 소개합니다', 'P&Lソリューションについて')}</h2>
              <p className="about-lead">{th('IT 인프라의 설계부터 안정적인 운영까지,<br>기업의 디지털 환경을 책임집니다.', 'ITインフラの設計から安定した運用まで、<br>企業のデジタル環境を責任を持って支えます。')}</p>
              <p className="about-body">{th('피엔엘솔루션(주)은 서버, 네트워크, 보안, 클라우드, 유지보수 분야에서 다양한 고객사의 IT 환경을 구축하고 운영해온 전문 기업입니다.<br><br>단순한 장비 납품이 아닌, 고객사의 비즈니스 요구에 최적화된 IT 환경 설계와 안정적인 운영을 통해 진정한 기술 파트너로서 함께합니다.', 'P&Lソリューションは、サーバー、ネットワーク、セキュリティ、クラウド、保守運用の分野で多様なお客様のIT環境を構築・運営してきた専門企業です。<br><br>単なる機器納品ではなく、お客様のビジネスニーズに最適化されたIT環境の設計と安定した運用を通じて、真の技術パートナーとして歩んでいます。')}</p>
              <div className="about-points">
                <div className="about-point">
                  <div className="about-point-num">01</div>
                  <div className="about-point-content">
                    <h4>{t('설계부터 운영까지 원스톱', '設計から運用までワンストップ')}</h4>
                    <p>{t('컨설팅 → 설계 → 구축 → 유지보수의 전 과정을 통합 관리합니다.', 'コンサルティング→設計→構築→保守の全工程を統合管理します。')}</p>
                  </div>
                </div>
                <div className="about-point">
                  <div className="about-point-num">02</div>
                  <div className="about-point-content">
                    <h4>{t('한국·일본 비즈니스 전문', '韓国・日本ビジネス専門')}</h4>
                    <p>{t('한국과 일본 시장 모두에서 IT 인프라 프로젝트를 지원합니다.', '韓国と日本市場の両方でITインフラプロジェクトをサポートします。')}</p>
                  </div>
                </div>
                <div className="about-point">
                  <div className="about-point-num">03</div>
                  <div className="about-point-content">
                    <h4>{t('24/7 안정적인 운영 체계', '24/7安定した運用体制')}</h4>
                    <p>{t('긴급 장애 대응부터 정기 점검까지 연중무휴 지원합니다.', '緊急障害対応から定期点検まで年中無休でサポートします。')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tech-stack" className="tech-stack-section">
        <div className="tech-stack-bg"></div>
        <div className="container">
          <div className="section-tag">{t('TECH STACK', 'TECH STACK')}</div>
          <h2 className="section-title">{t('핵심 기술 스택', 'コア技術スタック')}</h2>
          <p className="section-subtitle">{t('검증된 오픈소스와 최신 기술을 결합하여 최적의 IT 환경을 구축합니다.', '検証済みのオープンソースと最新技術を組み合わせ、最適なIT環境を構築します。')}</p>

          <div className="tech-grid">
            <div className="tech-category-card fade-up">
              <div className="tech-cat-title">
                <div className="tech-cat-icon">🐧</div>
                {t('인프라 & 고가용성', 'インフラ・高可用性')}
              </div>
              <ul className="tech-list">
                <li className="tech-item"><span className="tech-item-dot">✦</span>{t('Linux 서버 구축 및 운영', 'Linuxサーバー構築および運用')}</li>
                <li className="tech-item"><span className="tech-item-dot">✦</span>{t('Docker 기반 서비스 환경 구축', 'Dockerベースのサービス環境構築')}</li>
                <li className="tech-item"><span className="tech-item-dot">✦</span>{t('Proxmox 구축·운영 및 마이그레이션', 'Proxmox構築・運用および移行')}</li>
                <li className="tech-item"><span className="tech-item-dot">✦</span>{t('DRBD / NFS 기반 고가용성 구성', 'DRBD / NFSベースの高可用性構成')}</li>
              </ul>
            </div>

            <div className="tech-category-card fade-up">
              <div className="tech-cat-title">
                <div className="tech-cat-icon">📈</div>
                {t('모니터링 & 자동화', '監視・自動化')}
              </div>
              <ul className="tech-list">
                <li className="tech-item"><span className="tech-item-dot">✦</span>{t('오픈소스 모니터링 시스템 구축', 'オープンソース監視システム構築')}</li>
                <li className="tech-item"><span className="tech-item-dot">✦</span>{t('Zabbix / Grafana / Prometheus 구축', 'Zabbix / Grafana / Prometheus 構築')}</li>
                <li className="tech-item"><span className="tech-item-dot">✦</span>{t('Python / Ansible 기반 운영 자동화', 'Python / Ansibleベースの運用自動化')}</li>
              </ul>
            </div>

            <div className="tech-category-card fade-up">
              <div className="tech-cat-title">
                <div className="tech-cat-icon">🌐</div>
                {t('웹 & 데이터베이스', 'Web・データベース')}
              </div>
              <ul className="tech-list">
                <li className="tech-item"><span className="tech-item-dot">✦</span>{t('Nginx / Apache 웹서버 구축', 'Nginx / Apache Webサーバー構築')}</li>
                <li className="tech-item"><span className="tech-item-dot">✦</span>{t('JBoss / Tomcat / Resin 구축 및 운영', 'JBoss / Tomcat / Resin 構築および運用')}</li>
                <li className="tech-item"><span className="tech-item-dot">✦</span>{t('MariaDB / PostgreSQL / MySQL DB 운영', 'MariaDB / PostgreSQL / MySQL DB運用')}</li>
                <li className="tech-item"><span className="tech-item-dot">✦</span>{t('Postfix / Dovecot 기반 웹메일 서버 구축', 'Postfix / DovecotベースのWebメールサーバー構築')}</li>
              </ul>
            </div>

            <div className="tech-category-card fade-up">
              <div className="tech-cat-title">
                <div className="tech-cat-icon">🔐</div>
                {t('보안 & 협업 환경', 'セキュリティ・コラボレーション')}
              </div>
              <ul className="tech-list">
                <li className="tech-item"><span className="tech-item-dot">✦</span>{t('FreeRADIUS 인증 시스템 구축', 'FreeRADIUS認証システム構築')}</li>
                <li className="tech-item"><span className="tech-item-dot">✦</span>{t('Redmine / Git / Wiki 협업 시스템 구축', 'Redmine / Git / Wiki コラボレーションシステム構築')}</li>
                <li className="tech-item"><span className="tech-item-dot">✦</span>{t('보안 점검 및 운영 자동화', 'セキュリティ診断および運用自動化')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="services">
        <div className="container">
          <div className="services-header">
            <div>
              <div className="section-tag">{t('SERVICES', 'SERVICES')}</div>
              <h2 className="section-title">{t('주요 서비스', '主要サービス')}</h2>
              <p className="section-subtitle">{t('기업의 IT 인프라 전반에 걸친 전문 서비스를 제공합니다.', '企業のITインフラ全般にわたる専門サービスを提供します。')}</p>
            </div>
            <a href="#contact" className="btn-primary" style={{whiteSpace: "nowrap", alignSelf: "flex-end"}} onClick={(e) => scrollToSection(e, '#contact')}>{t('견적 문의하기', 'お見積もりを依頼')}</a>
          </div>

          <div className="services-grid">
            <div className="service-card featured fade-up">
              <div className="service-icon">🖥</div>
              <div className="service-name">{t('서버 구축', 'サーバー構築')}</div>
              <div className="service-desc">{t('기업 환경에 맞는 서버 인프라를 설계하고 구축합니다. 온프레미스부터 클라우드, 하이브리드까지 최적의 솔루션을 제안합니다.', '企業環境に適したサーバーインフラを設計・構築します。オンプレミスからクラウド、ハイブリッドまで最適なソリューションを提案します。')}</div>
              <ul className="service-features">
                <li>{t('물리 서버 / 가상화 서버 구축', '物理サーバー / 仮想化サーバー構築')}</li>
                <li>{t('고가용성(HA) 클러스터 구성', '高可用性（HA）クラスター構成')}</li>
                <li>{t('스토리지 및 백업 시스템', 'ストレージ・バックアップシステム')}</li>
                <li>{t('서버 성능 모니터링', 'サーバーパフォーマンス監視')}</li>
              </ul>
            </div>

            <div className="service-card fade-up">
              <div className="service-icon">🌐</div>
              <div className="service-name">{t('네트워크 구축', 'ネットワーク構築')}</div>
              <div className="service-desc">{t('기업 규모와 요구에 맞는 안정적이고 확장 가능한 네트워크 환경을 설계하고 구현합니다.', '企業の規模とニーズに合わせた安定的でスケーラブルなネットワーク環境を設計・実装します。')}</div>
              <ul className="service-features">
                <li>{t('LAN/WAN 네트워크 설계', 'LAN/WANネットワーク設計')}</li>
                <li>{t('SD-WAN / MPLS 구성', 'SD-WAN / MPLS構成')}</li>
                <li>{t('QoS 트래픽 최적화', 'QoSトラフィック最適化')}</li>
                <li>{t('네트워크 장애 진단·복구', 'ネットワーク障害診断・復旧')}</li>
              </ul>
            </div>

            <div className="service-card fade-up">
              <div className="service-icon">🔒</div>
              <div className="service-name">{t('보안 솔루션', 'セキュリティソリューション')}</div>
              <div className="service-desc">{t('방화벽, VPN, 접근 제어, 위협 탐지 등 기업의 보안 환경을 종합적으로 구성하고 관리합니다.', 'ファイアウォール、VPN、アクセス制御、脅威検知など、企業のセキュリティ環境を総合的に構築・管理します。')}</div>
              <ul className="service-features">
                <li>{t('방화벽 / IPS / IDS 구축', 'ファイアウォール / IPS / IDS構築')}</li>
                <li>{t('VPN / 제로트러스트 보안', 'VPN / ゼロトラストセキュリティ')}</li>
                <li>{t('보안 취약점 진단', 'セキュリティ脆弱性診断')}</li>
                <li>{t('보안 정책 수립 컨설팅', 'セキュリティポリシー策定コンサルティング')}</li>
              </ul>
            </div>

            <div className="service-card fade-up">
              <div className="service-icon">☁️</div>
              <div className="service-name">{t('클라우드 전환', 'クラウド移行')}</div>
              <div className="service-desc">{t('기존 온프레미스 환경에서 클라우드로 안전하게 전환합니다. AWS, Azure, GCP 등 주요 클라우드를 지원합니다.', '既存のオンプレミス環境からクラウドへ安全に移行します。AWS、Azure、GCPなど主要クラウドに対応しています。')}</div>
              <ul className="service-features">
                <li>{t('클라우드 마이그레이션 전략', 'クラウド移行戦略策定')}</li>
                <li>{t('멀티 클라우드 아키텍처', 'マルチクラウドアーキテクチャ')}</li>
                <li>{t('클라우드 비용 최적화', 'クラウドコスト最適化')}</li>
                <li>{t('클라우드 보안 및 컴플라이언스', 'クラウドセキュリティ・コンプライアンス')}</li>
              </ul>
            </div>

            <div className="service-card fade-up">
              <div className="service-icon">🛠</div>
              <div className="service-name">{t('유지보수 서비스', '保守・運用サービス')}</div>
              <div className="service-desc">{t('구축 이후에도 안정적인 운영을 위한 정기 점검, 장애 대응, 시스템 모니터링 서비스를 제공합니다.', '構築後も安定した運用のための定期点検、障害対応、システム監視サービスを提供します。')}</div>
              <ul className="service-features">
                <li>{t('24/7 시스템 모니터링', '24/7システム監視')}</li>
                <li>{t('정기 점검 및 예방 정비', '定期点検・予防保全')}</li>
                <li>{t('긴급 장애 대응', '緊急障害対応')}</li>
                <li>{t('월간 운영 보고서 제공', '月次運用レポート提供')}</li>
              </ul>
            </div>

            <div className="service-card fade-up">
              <div className="service-icon">🇯🇵</div>
              <div className="service-name">{t('일본 IT 비즈니스 지원', '日本ITビジネス支援')}</div>
              <div className="service-desc">{t('일본 진출 한국 기업 또는 일본 기업의 IT 인프라 도입을 이중 언어 전담팀이 원스톱으로 지원합니다.', '日本進出韓国企業または日本企業のITインフラ導入をバイリンガル専任チームがワンストップでサポートします。')}</div>
              <ul className="service-features">
                <li>{t('일한 이중 언어 기술 지원', '日韓バイリンガル技術サポート')}</li>
                <li>{t('일본 현지 IT 규정 대응', '日本現地IT規制への対応')}</li>
                <li>{t('원격·현지 하이브리드 지원', 'リモート・現地ハイブリッドサポート')}</li>
                <li>{t('일본 IT 벤더 협력 네트워크', '日本ITベンダー協力ネットワーク')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="cases">
        <div className="container">
          <div className="section-tag">{t('CASES', 'CASES')}</div>
          <h2 className="section-title">{t('구축 사례', '導入実績')}</h2>
          <p className="section-subtitle">{t('다양한 산업의 고객사와 함께한 IT 인프라 구축 경험입니다.', '様々な業種のお客様とともに歩んだITインフラ構築の実績です。')}</p>

          <div className="cases-grid">
            <div className="case-card fade-up">
              <div className="case-header">
                <div className="case-industry">{t('제조업', '製造業')}</div>
                <div className="case-badge">{t('Private Cloud', 'Private Cloud')}</div>
              </div>
              <div className="case-body">
                <div className="case-title">{t('글로벌 제조사 Private Cloud 전환 사례', 'グローバル製造企業のプライベートクラウド移行事例')}</div>
                <div className="case-desc">{t('기존 레거시 인프라를 확장성과 보안성이 뛰어난 Private Cloud 환경으로 성공적으로 전환하여 IT 자원 활용도를 극대화했습니다.', '既存のレガシーインフラを拡張性とセキュリティに優れたプライベートクラウド環境への移行に成功し、ITリソースの活用度を最大化しました。')}</div>
                <div className="case-results">
                  <div className="case-result">
                    <div className="case-result-val">30<span>%</span></div>
                    <div className="case-result-label">{t('TCO 절감', 'TCO削減')}</div>
                  </div>
                  <div className="case-result">
                    <div className="case-result-val">99.99<span>%</span></div>
                    <div className="case-result-label">{t('가동률 달성', '稼働率達成')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="case-card fade-up">
              <div className="case-header">
                <div className="case-industry">{t('공공기관', '公共機関')}</div>
                <div className="case-badge">{t('클라우드 마이그레이션', 'クラウド移行')}</div>
              </div>
              <div className="case-body">
                <div className="case-title">{t('공공기관 공공클라우드 마이그레이션 컨설팅 및 수행', '公共機関のパブリッククラウド移行コンサルティングおよび実行')}</div>
                <div className="case-desc">{t('공공기관의 엄격한 보안 요건을 충족하는 클라우드 전환 컨설팅을 제공하고, 무중단 마이그레이션을 성공적으로 완수했습니다.', '公共機関の厳しいセキュリティ要件を満たすクラウド移行コンサルティングを提供し、無停止での移行を成功裏に完了しました。')}</div>
                <div className="case-results">
                  <div className="case-result">
                    <div className="case-result-val">0<span>{t('초', '秒')}</span></div>
                    <div className="case-result-label">{t('서비스 중단 시간', 'サービスダウンタイム')}</div>
                  </div>
                  <div className="case-result">
                    <div className="case-result-val">100<span>%</span></div>
                    <div className="case-result-label">{t('보안 규정 준수', 'セキュリティ要件遵守')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="case-card fade-up">
              <div className="case-header">
                <div className="case-industry">{t('커뮤니티', 'コミュニティ')}</div>
                <div className="case-badge">{t('웹사이트 구축', 'Webサイト構築')}</div>
              </div>
              <div className="case-body">
                <div className="case-title">{t('한일교류회 사이트 구축', '日韓交流会サイト構築')}</div>
                <div className="case-desc">{t('한일 양국 사용자가 원활하게 소통할 수 있도록 다국어 지원 및 최적화된 UI/UX를 갖춘 커뮤니티 플랫폼을 구축했습니다.', '日韓両国のユーザーが円滑にコミュニケーションできるよう、多言語対応と最適化されたUI/UXを備えたコミュニティプラットフォームを構築しました。')}</div>
                <div className="case-results">
                  <div className="case-result">
                    <div className="case-result-val">2<span>{t('개국어', 'ヶ国語')}</span></div>
                    <div className="case-result-label">{t('완벽 지원', '完全対応')}</div>
                  </div>
                  <div className="case-result">
                    <div className="case-result-val">2<span>{t('배', '倍')}</span></div>
                    <div className="case-result-label">{t('접속 속도 향상', 'アクセス速度向上')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="case-card fade-up">
              <div className="case-header">
                <div className="case-industry">{t('IT 서비스', 'ITサービス')}</div>
                <div className="case-badge">{t('인프라 최적화', 'インフラ最適化')}</div>
              </div>
              <div className="case-body">
                <div className="case-title">{t('문서 아카이빙 기업 오픈소스 WEB/WAS/DB 이중화 구축 및 최적화', '文書アーカイブ企業のオープンソースWEB/WAS/DB冗長化構築および最適化')}</div>
                <div className="case-desc">{t('대용량 문서 데이터를 안정적으로 처리하기 위해 오픈소스 기반의 WEB, WAS, DB 이중화 아키텍처를 설계하고 성능을 극대화했습니다.', '大容量の文書データを安定して処理するため、オープンソースベースのWEB、WAS、DB冗長化アーキテクチャを設計し、パフォーマンスを最大化しました。')}</div>
                <div className="case-results">
                  <div className="case-result">
                    <div className="case-result-val">100<span>%</span></div>
                    <div className="case-result-label">{t('무중단 아키텍처', '無停止アーキテクチャ')}</div>
                  </div>
                  <div className="case-result">
                    <div className="case-result-val">3<span>{t('배', '倍')}</span></div>
                    <div className="case-result-label">{t('처리량 증가', 'スループット向上')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="japan-business">
        <div className="container">
          <div className="japan-header fade-up">
            <div className="section-tag">{t('JAPAN BUSINESS', 'JAPAN BUSINESS')}</div>
            <h2 className="section-title">{t('일본 IT 비즈니스 지원', '日本ITビジネス支援')}</h2>
            <p className="section-subtitle">{t('일본 시장의 IT 인프라 도입을 한국어·일본어 이중 언어 전담팀이 완전 지원합니다.', '日本市場のITインフラ導入を韓国語・日本語バイリンガル専任チームが完全サポートします。')}</p>
          </div>

          <div className="japan-grid">
            <div className="japan-cards fade-up">
              <div className="japan-card">
                <div className="japan-card-icon">🌏</div>
                <div>
                  <div className="japan-card-title">{t('일본 진출 한국 기업 IT 지원', '日本進出韓国企業のITサポート')}</div>
                  <div className="japan-card-desc">{t('일본에 법인을 설립하거나 진출 예정인 한국 기업의 IT 인프라를 현지화하여 구축합니다.', '日本に法人を設立する・進出予定の韓国企業のITインフラを現地化して構築します。')}</div>
                </div>
              </div>
              <div className="japan-card">
                <div className="japan-card-icon">🤝</div>
                <div>
                  <div className="japan-card-title">{t('일본 기업 IT 인프라 도입 대행', '日本企業へのITインフラ導入代行')}</div>
                  <div className="japan-card-desc">{t('일본 현지 기업의 IT 시스템 도입과 운영을 한국어·일본어 이중 언어로 지원합니다.', '日本現地企業のITシステム導入と運用を韓国語・日本語バイリンガルでサポートします。')}</div>
                </div>
              </div>
              <div className="japan-card">
                <div className="japan-card-icon">📋</div>
                <div>
                  <div className="japan-card-title">{t('일본 IT 규정·컴플라이언스 대응', '日本IT規制・コンプライアンス対応')}</div>
                  <div className="japan-card-desc">{t('개인정보보호법 등 일본 현지 IT 관련 법규 및 규정에 맞게 시스템을 설계합니다.', '個人情報保護法など日本の現地IT関連法規・規制に合わせてシステムを設計します。')}</div>
                </div>
              </div>
              <div className="japan-card">
                <div className="japan-card-icon">💬</div>
                <div>
                  <div className="japan-card-title">{t('이중 언어 헬프데스크 운영', 'バイリンガルヘルプデスク運営')}</div>
                  <div className="japan-card-desc">{t('한국어와 일본어 모두 지원하는 전담 헬프데스크로 신속한 기술 지원을 제공합니다.', '韓国語と日本語の両方に対応する専任ヘルプデスクで迅速な技術サポートを提供します。')}</div>
                </div>
              </div>
            </div>

            <div className="japan-info fade-up">
              <div className="japan-info-title">{th('일본 시장의 IT 특수성을<br>잘 이해하고 있습니다', '日本市場のIT特性を<br>深く理解しています')}</div>
              <div className="japan-info-body">{th('일본은 IT 도입 방식, 현지 규정, 벤더 생태계가 한국과 다릅니다.<br><br>피엔엘솔루션(주)은 일본 비즈니스 환경을 깊이 이해하는 팀이 직접 프로젝트를 담당하여, 언어 장벽 없이 현지에서 발생하는 문제를 신속하게 해결합니다.<br><br>한국과 일본 양국 비즈니스를 동시에 지원하는 유일한 IT 인프라 파트너입니다.', '日本はITの導入方式、現地規制、ベンダーエコシステムが韓国と異なります。<br><br>P&Lソリューションは日本のビジネス環境を深く理解するチームが直接プロジェクトを担当し、言語の壁なく現地で発生する問題を迅速に解決します。<br><br>韓国と日本の両国のビジネスを同時にサポートできる唯一のITインフラパートナーです。')}</div>

              <div className="japan-cta-card">
                <div className="japan-cta-label">{t('일본 비즈니스 전담 문의', '日本ビジネス専任お問い合わせ')}</div>
                <div className="japan-cta-value">sales@pnls.co.kr</div>
                <div className="japan-cta-sub">{t('한국어 / 일본어 동시 지원', '韓国語 / 日本語 同時対応')}</div>
                <a href="#contact" className="btn-primary" style={{display: "inline-flex", padding: "11px 24px", fontSize: "14px"}} onClick={(e) => scrollToSection(e, '#contact')}>{t('일본 비즈니스 문의하기', '日本ビジネス支援を相談する')}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="section-tag">{t('CONTACT', 'CONTACT')}</div>
          <h2 className="section-title">{t('견적 문의', 'お見積もり・お問い合わせ')}</h2>
          <p className="section-subtitle">{t('IT 인프라 관련 어떤 문의도 환영합니다. 빠르게 연락드리겠습니다.', 'ITインフラに関するお問い合わせは何でもお受けします。速やかにご連絡いたします。')}</p>

          <div className="contact-grid">
            <div className="contact-info fade-up">
              <div className="contact-info-item">
                <div className="contact-info-icon">📧</div>
                <div>
                  <div className="contact-info-label">{t('이메일', 'メール')}</div>
                  <div className="contact-info-value">sales@pnls.co.kr</div>
                  <div className="contact-info-sub">{t('24시간 이내 답변', '24時間以内にご返信')}</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">📍</div>
                <div>
                  <div className="contact-info-label">{t('주소', '住所')}</div>
                  <div className="contact-info-value">{t('서울특별시 금천구 가산디지털1로 226, 701호', 'ソウル特別市衿川区加山デジタル1路226、701号')}</div>
                  <div className="contact-info-sub">{t('일본어 문의도 가능합니다', '日本語でのお問い合わせも可能です')}</div>
                </div>
              </div>

              <div style={{marginTop: "32px", padding: "24px", background: "var(--navy-50)", borderRadius: "var(--radius-lg)", border: "1px solid var(--navy-100)"}}>
                <div style={{fontSize: "14px", fontWeight: "700", color: "var(--navy-900)", marginBottom: "10px"}}>{t('✅ 이런 경우 문의주세요', '✅ こんな場合はご相談ください')}</div>
                <ul style={{listStyle: "none", display: "flex", flexDirection: "column", gap: "8px"}}>
                  <li style={{fontSize: "13px", color: "var(--gray-600)", display: "flex", gap: "8px"}}>{t('→ 서버·네트워크 신규 구축이 필요한 경우', '→ サーバー・ネットワークの新規構築が必要な場合')}</li>
                  <li style={{fontSize: "13px", color: "var(--gray-600)", display: "flex", gap: "8px"}}>{t('→ 클라우드 전환을 검토 중인 경우', '→ クラウド移行を検討中の場合')}</li>
                  <li style={{fontSize: "13px", color: "var(--gray-600)", display: "flex", gap: "8px"}}>{t('→ 보안 취약점 점검이 필요한 경우', '→ セキュリティ脆弱性診断が必要な場合')}</li>
                  <li style={{fontSize: "13px", color: "var(--gray-600)", display: "flex", gap: "8px"}}>{t('→ 일본 IT 비즈니스 지원이 필요한 경우', '→ 日本ITビジネス支援が必要な場合')}</li>
                </ul>
              </div>
            </div>

            <div className="contact-form fade-up">
              <div className="form-title">{t('무료 견적 문의', '無料お見積もりのご依頼')}</div>
              <div className="form-subtitle">{t('아래 내용을 작성해 주시면 담당자가 빠르게 연락드립니다.', '以下の内容をご記入いただければ、担当者より速やかにご連絡いたします。')}</div>

              <form id="contactForm" onSubmit={submitForm}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" dangerouslySetInnerHTML={{__html: t('회사명 <span>*</span>', '会社名 <span>*</span>')}}></label>
                    <input type="text" className="form-input" id="company" placeholder={t('회사명을 입력해주세요', '会社名をご入力ください')} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" dangerouslySetInnerHTML={{__html: t('담당자명 <span>*</span>', 'ご担当者名 <span>*</span>')}}></label>
                    <input type="text" className="form-input" id="name" placeholder={t('이름을 입력해주세요', 'お名前をご入力ください')} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" dangerouslySetInnerHTML={{__html: t('이메일 <span>*</span>', 'メールアドレス <span>*</span>')}}></label>
                    <input type="email" className="form-input" id="email" placeholder={t('이메일을 입력해주세요', 'メールアドレスをご入力ください')} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" dangerouslySetInnerHTML={{__html: t('문의 서비스 <span>*</span>', 'お問い合わせサービス <span>*</span>')}}></label>
                    <select className="form-select form-input" id="service" required>
                      <option value="">{t('서비스를 선택해주세요', 'サービスをお選びください')}</option>
                      <option value="server">{t('서버 구축', 'サーバー構築')}</option>
                      <option value="network">{t('네트워크 구축', 'ネットワーク構築')}</option>
                      <option value="security">{t('보안 솔루션', 'セキュリティソリューション')}</option>
                      <option value="cloud">{t('클라우드 전환', 'クラウド移行')}</option>
                      <option value="maintenance">{t('유지보수', '保守・運用')}</option>
                      <option value="japan">{t('일본 IT 비즈니스 지원', '日本ITビジネス支援')}</option>
                      <option value="other">{t('기타 문의', 'その他のお問い合わせ')}</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" dangerouslySetInnerHTML={{__html: t('문의 내용 <span>*</span>', 'お問い合わせ内容 <span>*</span>')}}></label>
                  <textarea className="form-textarea" id="message" placeholder={t('현재 IT 환경과 필요하신 서비스에 대해 자유롭게 작성해 주세요.', '現在のIT環境と必要なサービスについて自由にご記入ください。')} required></textarea>
                </div>
                <button type="submit" className="form-submit" id="submitBtn" disabled={isSubmitting} style={{opacity: isSubmitting ? 0.7 : 1}}>
                  {isSubmitting ? t('전송 중...', '送信中...') : t('📨 무료 견적 문의 보내기', '📨 無料見積もりを送信する')}
                </button>
                <div className="form-note">{t('개인정보는 문의 처리 목적으로만 사용됩니다.', '個人情報はお問い合わせ対応のみに使用されます。')}</div>
                <div className={`form-success ${isSuccess ? 'show' : ''}`} id="formSuccess">
                  <span>{t('✅ 문의가 접수되었습니다. 담당자가 24시간 이내 연락드리겠습니다.', '✅ お問い合わせを受け付けました。担当者より24時間以内にご連絡いたします。')}</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div style={{ marginBottom: '16px' }}>
                <Image src="/images/logo.png" alt="P&L Solution" width={240} height={60} style={{ objectFit: 'contain', height: '48px', width: 'auto' }} />
              </div>
              <div className="footer-tagline">{th('IT 인프라의 설계부터 운영까지,<br>기업의 안정적인 비즈니스를 지원합니다.', 'ITインフラの設計から運用まで、<br>企業の安定したビジネスを支援します。')}</div>
            </div>

            <div>
              <div className="footer-section-title">{t('서비스', 'サービス')}</div>
              <ul className="footer-links">
                <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')}>{t('서버 구축', 'サーバー構築')}</a></li>
                <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')}>{t('네트워크 구축', 'ネットワーク構築')}</a></li>
                <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')}>{t('보안 솔루션', 'セキュリティソリューション')}</a></li>
                <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')}>{t('클라우드 전환', 'クラウド移行')}</a></li>
                <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')}>{t('유지보수', '保守・運用')}</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-section-title">{t('회사', '会社')}</div>
              <ul className="footer-links">
                <li><a href="#about" onClick={(e) => scrollToSection(e, '#about')}>{t('회사소개', '会社紹介')}</a></li>
                <li><a href="#cases" onClick={(e) => scrollToSection(e, '#cases')}>{t('구축사례', '導入実績')}</a></li>
                <li><a href="#japan-business" onClick={(e) => scrollToSection(e, '#japan-business')}>{t('일본 비즈니스', '日本ビジネス')}</a></li>
                <li><a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>{t('견적문의', 'お問い合わせ')}</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-section-title">{t('연락처', '連絡先')}</div>
              <ul className="footer-links">
                <li><a href="mailto:sales@pnls.co.kr">sales@pnls.co.kr</a></li>
                <li><a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>{t('서울특별시 금천구 가산디지털1로 226, 701호', 'ソウル特別市衿川区加山デジタル1路226、701号')}</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">© 2026 피엔엘솔루션(주). All rights reserved.</div>
            <div className="footer-langs">
              <button className="lang-btn" style={{background:'transparent', color:'inherit', border:'none', padding:0, fontSize:'14px', cursor:'pointer'}} onClick={() => switchLang('ko')}>한국어</button>
              <span style={{margin:'0 10px', color:'var(--gray-600)'}}>|</span>
              <button className="lang-btn" style={{background:'transparent', color:'inherit', border:'none', padding:0, fontSize:'14px', cursor:'pointer'}} onClick={() => switchLang('ja')}>日本語</button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
