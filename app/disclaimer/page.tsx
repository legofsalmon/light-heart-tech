'use client';

import styles from './page.module.scss';

export default function DisclaimerPage() {
  return (
    <div className={`page-enter ${styles.page}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="status-led orange" />
          <span className="mono text-soft-gray">LEGAL NOTICE</span>
        </div>
        <h1 className={styles.title}>DISCLAIMER</h1>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div className={styles.text}>
            <p>
              This document has been prepared by Idirnet for the exclusive use of Lightheart Ltd
              and is intended for internal planning and vendor coordination purposes only.
            </p>
            <p>
              All specifications, configurations, and pricing contained herein are subject to change
              based on vendor quotes, site survey results, and client decisions. Figures are
              estimates unless explicitly marked as confirmed.
            </p>
            <p>
              Idirnet makes no warranties, expressed or implied, regarding the completeness or
              accuracy of third-party product specifications referenced in this document. All
              product names, logos, and brands are property of their respective owners.
            </p>
            <p>
              This document contains confidential and proprietary information. Unauthorised
              distribution, reproduction, or use of this material is strictly prohibited.
            </p>
            <p>
              For questions regarding this specification, contact the project lead at{' '}
              <span className="text-neon-cyan">kris@idirnet.com</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
