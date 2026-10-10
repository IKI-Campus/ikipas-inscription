import React from 'react';
import { StudentRegistrationData } from '../types';
import { OfficialLogo } from './OfficialLogo';

interface OfficialPrintableSheetProps {
  data: StudentRegistrationData;
  mode: 'personal_only' | 'complete';
}

export const OfficialPrintableSheet: React.FC<OfficialPrintableSheetProps> = ({
  data,
  mode,
}) => {
  return (
    <div id="official-printable-sheet" className="space-y-6 print:space-y-0">
      {/* ================= PAGE 1 ================= */}
      <div
        className="pdf-page bg-white mx-auto shadow-sm print:shadow-none print:m-0"
        style={{
          width: '794px',
          minHeight: '1123px',
          maxHeight: '1123px',
          padding: '28px 36px',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          color: '#000000',
          fontFamily: 'Arial, Helvetica, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid #d1d5db',
          pageBreakAfter: mode === 'complete' ? 'always' : 'auto',
        }}
      >
        <div>
          {/* Official Ministry Header */}
          <div
            className="pb-2.5 mb-3 text-center"
            style={{ borderBottom: '2px solid #000000' }}
          >
            <div className="grid grid-cols-3 items-center text-[10px]" style={{ color: '#1f2937' }}>
              <div className="text-left space-y-0.5">
                <p style={{ fontWeight: 'bold', fontSize: '10px', lineHeight: '1.25' }}>ROYAUME DU MAROC</p>
                <p style={{ fontSize: '9px', lineHeight: '1.25' }}>Ministère de l'Éducation Nationale,</p>
                <p style={{ fontSize: '9px', lineHeight: '1.25' }}>du Préscolaire et des Sports</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <OfficialLogo size={46} className="mb-1" />
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '20px',
                    padding: '0 10px',
                    border: '1.5px solid #000000',
                    backgroundColor: '#f3f4f6',
                    fontWeight: 'bold',
                    fontSize: '9px',
                    lineHeight: '1',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    boxSizing: 'border-box',
                  }}
                >
                  IKIPAS • 2027-2028
                </div>
              </div>
              <div className="text-right space-y-0.5" dir="rtl">
                <p style={{ fontWeight: 'bold', fontSize: '10.5px', lineHeight: '1.25' }}>المملكة المغربية</p>
                <p style={{ fontSize: '9.5px', lineHeight: '1.25' }}>وزارة التربية الوطنية والتعليم الأولي</p>
                <p style={{ fontSize: '9.5px', lineHeight: '1.25' }}>والرياضة</p>
              </div>
            </div>

            <h1
              style={{
                fontSize: '14px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#000000',
                marginTop: '10px',
                marginBottom: '2px',
                lineHeight: '1.25',
                textAlign: 'center',
              }}
            >
              {mode === 'personal_only'
                ? 'Fiche de Renseignements Personnels et Familiaux du Candidat'
                : "Dossier de Candidature & Choix d'Établissement (Page 1/2)"}
            </h1>
            <p style={{ fontSize: '9.5px', fontStyle: 'italic', color: '#374151', textAlign: 'center', lineHeight: '1.2' }}>
              بطاقة المعلومات الشخصية والتوجيه الأكاديمي للتعليم العالي
            </p>
          </div>

          {/* Section 1: Informations de l'Élève */}
          <div className="mb-3" style={{ border: '1px solid #000000', boxSizing: 'border-box' }}>
            <div
              style={{
                backgroundColor: '#e5e7eb',
                borderBottom: '1px solid #000000',
                fontWeight: 'bold',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 10px',
                fontSize: '10.5px',
                lineHeight: '1',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', lineHeight: '1' }}>
                1. RENSEIGNEMENTS SUR L'ÉLÈVE (معلومات التلميذ)
              </span>
              <span style={{ fontSize: '9px', fontWeight: 'normal', color: '#374151', display: 'flex', alignItems: 'center', lineHeight: '1' }}>
                Cadre réservé au candidat
              </span>
            </div>

            {/* Row 1: Nom & Prénom FR / AR */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #e5e7eb', height: '26px', boxSizing: 'border-box', fontSize: '10.5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', borderRight: '1px solid #e5e7eb', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Nom et Prénom :&nbsp;</span>
                <strong style={{ textTransform: 'uppercase' }}>{data.nomPrenom || '—'}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 10px', lineHeight: '1.2' }} dir="rtl">
                <span style={{ color: '#374151', fontWeight: '600' }}>الاسم والنسب :&nbsp;</span>
                <strong>{data.nomPrenomAr || '—'}</strong>
              </div>
            </div>

            {/* Row 2: Massar & CIN */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #e5e7eb', height: '26px', boxSizing: 'border-box', fontSize: '10.5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', borderRight: '1px solid #e5e7eb', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Code Massar (رقم مسار) :&nbsp;</span>
                <strong style={{ fontFamily: 'monospace' }}>{data.codeMassar || '—'}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>N° CIN (البطاقة الوطنية) :&nbsp;</span>
                <strong style={{ fontFamily: 'monospace' }}>{data.cin || '—'}</strong>
              </div>
            </div>

            {/* Row 3: Date & Lieu de naissance */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #e5e7eb', height: '26px', boxSizing: 'border-box', fontSize: '10.5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', borderRight: '1px solid #e5e7eb', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Né(e) le :&nbsp;</span>
                <strong>{data.dateNaissance || '—'}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Lieu de naissance :&nbsp;</span>
                <strong>{data.lieuNaissance || '—'}</strong>
              </div>
            </div>

            {/* Row 4: Adresse personnelle */}
            <div style={{ borderBottom: '1px solid #e5e7eb', height: '26px', display: 'flex', alignItems: 'center', padding: '0 10px', boxSizing: 'border-box', fontSize: '10.5px', lineHeight: '1.2' }}>
              <span style={{ color: '#374151', fontWeight: '600' }}>Adresse personnelle :&nbsp;</span>
              <span>{data.adresse || '—'}{data.ville ? `, ${data.ville}` : ''}{data.codePostal ? ` (${data.codePostal})` : ''}</span>
            </div>

            {/* Row 5: Téléphone & WhatsApp */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #e5e7eb', height: '26px', boxSizing: 'border-box', fontSize: '10.5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', borderRight: '1px solid #e5e7eb', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Téléphone élève :&nbsp;</span>
                <span style={{ fontFamily: 'monospace' }}>{data.telephone || '—'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>N° WhatsApp :&nbsp;</span>
                <span style={{ fontFamily: 'monospace' }}>{data.whatsapp || '—'}</span>
              </div>
            </div>

            {/* Row 6: E-mail */}
            <div style={{ height: '26px', display: 'flex', alignItems: 'center', padding: '0 10px', boxSizing: 'border-box', fontSize: '10.5px', lineHeight: '1.2' }}>
              <span style={{ color: '#374151', fontWeight: '600' }}>E-mail élève :&nbsp;</span>
              <span style={{ fontFamily: 'monospace' }}>{data.email || '—'}</span>
            </div>
          </div>

          {/* Section 2: Parcours Scolaire & Notes */}
          <div className="mb-3" style={{ border: '1px solid #000000', boxSizing: 'border-box' }}>
            <div
              style={{
                backgroundColor: '#e5e7eb',
                borderBottom: '1px solid #000000',
                fontWeight: 'bold',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                fontSize: '10.5px',
                lineHeight: '1',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', lineHeight: '1' }}>
                2. SCOLARITÉ & RÉSULTATS DU BAC (المسار الدراسي ومعدلات البكالوريا)
              </span>
            </div>

            {/* Row 1: Lycée & Filière */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #e5e7eb', height: '26px', boxSizing: 'border-box', fontSize: '10.5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', borderRight: '1px solid #e5e7eb', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Établissement actuel (Lycée) :&nbsp;</span>
                <strong>{data.lyceeActuel || '—'}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Filière du Bac :&nbsp;</span>
                <strong>{data.filiereBac || '—'}</strong>
              </div>
            </div>

            {/* Row 2: Notes Régional & Contrôle */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '26px', boxSizing: 'border-box', fontSize: '10.5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', borderRight: '1px solid #e5e7eb', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Note Examen Régional :&nbsp;</span>
                <strong style={{ fontFamily: 'monospace' }}>{data.noteRegional ? `${data.noteRegional} / 20` : '—'}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Moyenne Contrôle Continu :&nbsp;</span>
                <strong style={{ fontFamily: 'monospace' }}>{data.noteControleContinu ? `${data.noteControleContinu} / 20` : '—'}</strong>
              </div>
            </div>
          </div>

          {/* Section 3: Informations des Parents & Tuteur */}
          <div className="mb-3" style={{ border: '1px solid #000000', boxSizing: 'border-box' }}>
            <div
              style={{
                backgroundColor: '#e5e7eb',
                borderBottom: '1px solid #000000',
                fontWeight: 'bold',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                fontSize: '10.5px',
                lineHeight: '1',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', lineHeight: '1' }}>
                3. RENSEIGNEMENTS SUR LES PARENTS ET TUTEUR (معلومات الوالدين والولي)
              </span>
            </div>

            {/* Père */}
            <div style={{ display: 'grid', gridTemplateColumns: '38% 32% 30%', borderBottom: '1px solid #e5e7eb', height: '26px', boxSizing: 'border-box', fontSize: '10.5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', borderRight: '1px solid #e5e7eb', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Nom du Père (الأب) :&nbsp;</span>
                <strong>{data.nomPere || '—'}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', borderRight: '1px solid #e5e7eb', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Profession :&nbsp;</span>
                <span>{data.professionPere || '—'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Tél :&nbsp;</span>
                <span style={{ fontFamily: 'monospace' }}>{data.telPere || '—'}</span>
              </div>
            </div>

            {/* Mère */}
            <div style={{ display: 'grid', gridTemplateColumns: '38% 32% 30%', borderBottom: '1px solid #e5e7eb', height: '26px', boxSizing: 'border-box', fontSize: '10.5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', borderRight: '1px solid #e5e7eb', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Nom de la Mère (الأم) :&nbsp;</span>
                <strong>{data.nomMere || '—'}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', borderRight: '1px solid #e5e7eb', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Profession :&nbsp;</span>
                <span>{data.professionMere || '—'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Tél :&nbsp;</span>
                <span style={{ fontFamily: 'monospace' }}>{data.telMere || '—'}</span>
              </div>
            </div>

            {/* Tuteur & Couverture médicale */}
            <div style={{ display: 'grid', gridTemplateColumns: '55% 45%', height: '26px', boxSizing: 'border-box', fontSize: '10.5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', borderRight: '1px solid #e5e7eb', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Tuteur légal (الولي الشرعي) :&nbsp;</span>
                <strong style={{ textTransform: 'capitalize' }}>
                  {data.tuteurType === 'pere' ? 'Le Père (الأب)' : data.tuteurType === 'mere' ? 'La Mère (الأم)' : 'Autre tuteur'}
                </strong>
                {data.tuteurType === 'autre' && data.nomTuteur && <span>&nbsp;({data.nomTuteur})</span>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', lineHeight: '1.2' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Couverture Médicale :&nbsp;</span>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '20px',
                    padding: '0 8px',
                    border: '1px solid #000000',
                    backgroundColor: '#f3f4f6',
                    fontWeight: 'bold',
                    fontSize: '9px',
                    lineHeight: '1',
                    boxSizing: 'border-box',
                    marginLeft: '6px',
                  }}
                >
                  {data.couvertureMedicale}
                </div>
              </div>
            </div>
          </div>

          {/* If mode is personal_only, include signatures directly on page 1 */}
          {mode === 'personal_only' && (
            <div className="p-3 space-y-3 mt-3" style={{ border: '1px solid #000000', boxSizing: 'border-box' }}>
              <p className="text-[10px] leading-relaxed italic" style={{ color: '#374151', lineHeight: '1.3' }}>
                Je certifie sur l'honneur l'exactitude des informations fournies ci-dessus. Toute déclaration inexacte expose son auteur à l'annulation de sa candidature conformément à la réglementation en vigueur.
                <span className="block text-right mt-0.5" dir="rtl">
                  أشهد بصحة المعلومات المصرح بها أعلاه وأتحمل المسؤولية كاملة عن أي تصريح غير مطابق للحقيقة.
                </span>
              </p>

              <div
                className="flex justify-between items-center pt-2"
                style={{ borderTop: '1px solid #d1d5db', height: '24px', boxSizing: 'border-box' }}
              >
                <div className="text-[10px]" style={{ color: '#4b5563', display: 'flex', alignItems: 'center', gap: '16px', lineHeight: '1' }}>
                  <span>Fait à : <strong style={{ color: '#000000' }}>{data.ville || '........................'}</strong></span>
                  <span>Le : <strong style={{ color: '#000000' }}>{data.dateCandidature}</strong></span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3.5 pt-2 items-stretch" style={{ borderTop: '1px solid #000000' }}>
                {/* Candidate Signature Box */}
                <div
                  style={{
                    backgroundColor: '#f9fafb',
                    border: '1px solid #d1d5db',
                    height: '116px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '6px 8px',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  <div style={{ height: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '9.5px', color: '#000000', lineHeight: '1.1' }}>
                      Signature du candidat
                    </p>
                    <span style={{ fontSize: '7.5px', color: '#6b7280', lineHeight: '1.1' }}>(توقيع التلميذ)</span>
                  </div>

                  <div style={{ height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {data.signatureEleve ? (
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src={data.signatureEleve}
                          alt="Signature élève"
                          style={{ maxHeight: '42px', maxWidth: '120px', objectFit: 'contain' }}
                        />
                        <span style={{ fontSize: '7px', color: '#047857', fontWeight: 'bold', lineHeight: '1', marginTop: '2px' }}>
                          ✓ Signé électroniquement
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '8px', color: '#9ca3af' }}>[Cadre réservé à la signature]</span>
                    )}
                  </div>

                  <div style={{ height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '8px', color: '#6b7280', lineHeight: '1' }}>
                      {data.nomPrenom || 'Le Candidat'}
                    </span>
                  </div>
                </div>

                {/* Stamp Box */}
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px dashed #93c5fd',
                    height: '116px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '6px 8px',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  <div style={{ height: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '9px', color: '#1e40af', lineHeight: '1.1' }}>
                      Cachet officiel d'enregistrement
                    </p>
                    <span style={{ fontSize: '7.5px', color: '#6b7280', lineHeight: '1.1' }}>(طابع المصادقة الإدارية)</span>
                  </div>

                  <div style={{ height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <OfficialLogo variant="stamp" size={54} />
                  </div>

                  <div style={{ height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '7.5px', color: '#1e40af', fontWeight: 'bold', lineHeight: '1' }}>
                      CONFORME • 2027-2028
                    </span>
                  </div>
                </div>

                {/* Guardian Signature Box */}
                <div
                  style={{
                    backgroundColor: '#f9fafb',
                    border: '1px solid #d1d5db',
                    height: '116px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '6px 8px',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  <div style={{ height: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '9.5px', color: '#000000', lineHeight: '1.1' }}>
                      Signature du tuteur légal
                    </p>
                    <span style={{ fontSize: '7.5px', color: '#6b7280', lineHeight: '1.1' }}>(توقيع وموافقة ولي الأمر)</span>
                  </div>

                  <div style={{ height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {data.signatureTuteur ? (
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src={data.signatureTuteur}
                          alt="Signature tuteur"
                          style={{ maxHeight: '42px', maxWidth: '120px', objectFit: 'contain' }}
                        />
                        <span style={{ fontSize: '7px', color: '#047857', fontWeight: 'bold', lineHeight: '1', marginTop: '2px' }}>
                          ✓ Signé électroniquement
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '8px', color: '#9ca3af' }}>[Cadre réservé au tuteur légal]</span>
                    )}
                  </div>

                  <div style={{ height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '8px', color: '#6b7280', lineHeight: '1' }}>
                      {data.tuteurType === 'pere' ? data.nomPere || 'Le Père' : data.tuteurType === 'mere' ? data.nomMere || 'La Mère' : data.nomTuteur || 'Le Tuteur Légal'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Complete mode reminder at bottom of page 1 */}
          {mode === 'complete' && (
            <div
              style={{
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f3f4f6',
                border: '1px dashed #9ca3af',
                color: '#374151',
                fontSize: '9.5px',
                fontWeight: 'bold',
                lineHeight: '1',
                boxSizing: 'border-box',
                padding: '0 12px',
                marginTop: '10px',
              }}
            >
              Suite du dossier : Les choix d'établissements, spécialités et les signatures officielles figurent en Page 2.
            </div>
          )}
        </div>

        {/* Page 1 Footer */}
        <div
          className="pt-2 text-[8.5px] flex justify-between items-center"
          style={{ borderTop: '1px solid #e5e7eb', color: '#6b7280', height: '22px', boxSizing: 'border-box', lineHeight: '1' }}
        >
          <span>IKIPAS • Sièges : Tanger (Résidence 4 Temps) | Fès (Av. Ibn Al Haytham) • contact@ikipas.com</span>
          <span>Infoline : 0606799330 / 0700635666 / 0661862506 • {mode === 'complete' ? 'Page 1/2' : 'Page 1/1'}</span>
        </div>
      </div>

      {/* ================= PAGE 2 (SEULEMENT EN MODE COMPLET) ================= */}
      {mode === 'complete' && (
        <div
          className="pdf-page bg-white mx-auto shadow-sm print:shadow-none print:m-0"
          style={{
            width: '794px',
            minHeight: '1123px',
            maxHeight: '1123px',
            padding: '28px 36px',
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            color: '#000000',
            fontFamily: 'Arial, Helvetica, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid #d1d5db',
          }}
        >
          <div>
            {/* Page 2 Top Header Mini Banner */}
            <div
              className="pb-2 mb-3 flex justify-between items-center text-[10px]"
              style={{ borderBottom: '2px solid #000000', height: '32px', boxSizing: 'border-box' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', lineHeight: '1' }}>
                <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  Candidat : {data.nomPrenom || '—'}
                </span>
                <span style={{ marginLeft: '12px', color: '#4b5563' }}>
                  Code Massar : <strong style={{ fontFamily: 'monospace' }}>{data.codeMassar || '—'}</strong>
                </span>
              </div>
              <div className="text-right flex items-center gap-2">
                <OfficialLogo size={24} />
                <div
                  style={{
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 8px',
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #000000',
                    fontWeight: 'bold',
                    fontSize: '9px',
                    lineHeight: '1',
                    boxSizing: 'border-box',
                  }}
                >
                  DOSSIER D'ORIENTATION • PAGE 2/2
                </div>
              </div>
            </div>

            {/* Section 4: Liste des Établissements et Spécialités */}
            <div className="mb-4" style={{ border: '1px solid #000000', boxSizing: 'border-box' }}>
              <div
                style={{
                  backgroundColor: '#e5e7eb',
                  borderBottom: '1px solid #000000',
                  fontWeight: 'bold',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 10px',
                  fontSize: '10.5px',
                  lineHeight: '1',
                  boxSizing: 'border-box',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', lineHeight: '1' }}>
                  4. LISTE DES ÉTABLISSEMENTS ET SPÉCIALITÉS SÉLECTIONNÉS (اختيارات المؤسسات والتخصصات)
                </span>
                <span style={{ fontSize: '10px', color: '#047857', fontWeight: 'bold', display: 'flex', alignItems: 'center', lineHeight: '1' }}>
                  {data.selectedChoices && data.selectedChoices.length > 0
                    ? `${data.selectedChoices.length} Choix validé(s)`
                    : '1 Choix'}
                </span>
              </div>

              {data.selectedChoices && data.selectedChoices.length > 0 ? (
                <div className="p-2">
                  <table
                    className="w-full text-[10px]"
                    style={{ borderCollapse: 'collapse', border: '1px solid #9ca3af', width: '100%' }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '1px solid #9ca3af', color: '#111827', height: '28px' }}>
                        <th style={{ padding: '0 6px', borderRight: '1px solid #9ca3af', width: '36px', textAlign: 'center', verticalAlign: 'middle', lineHeight: '1' }}>N°</th>
                        <th style={{ padding: '0 8px', borderRight: '1px solid #9ca3af', textAlign: 'left', verticalAlign: 'middle', lineHeight: '1' }}>Établissement (المؤسسة)</th>
                        <th style={{ padding: '0 8px', borderRight: '1px solid #9ca3af', textAlign: 'left', verticalAlign: 'middle', lineHeight: '1' }}>Ville / Centre (المدينة)</th>
                        <th style={{ padding: '0 8px', textAlign: 'left', verticalAlign: 'middle', lineHeight: '1' }}>Filière / Spécialité Choisie (الشعبة والتخصص)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.selectedChoices.map((choice, idx) => (
                        <tr
                          key={choice.id || idx}
                          style={{
                            borderBottom: '1px solid #d1d5db',
                            backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9fafb',
                            color: '#000000',
                            height: '28px',
                          }}
                        >
                          <td
                            style={{
                              padding: '0 6px',
                              borderRight: '1px solid #d1d5db',
                              fontWeight: 'bold',
                              textAlign: 'center',
                              backgroundColor: '#f3f4f6',
                              verticalAlign: 'middle',
                              lineHeight: '1.2',
                            }}
                          >
                            {idx + 1}
                          </td>
                          <td style={{ padding: '0 8px', borderRight: '1px solid #d1d5db', fontWeight: 'bold', verticalAlign: 'middle', lineHeight: '1.2' }}>
                            {choice.schoolName}
                          </td>
                          <td style={{ padding: '0 8px', borderRight: '1px solid #d1d5db', color: '#374151', verticalAlign: 'middle', lineHeight: '1.2' }}>
                            {choice.city || '—'}
                          </td>
                          <td style={{ padding: '0 8px', fontWeight: '600', color: '#111827', verticalAlign: 'middle', lineHeight: '1.2' }}>
                            {choice.option || 'Tronc commun / Standard'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : data.selectedSchoolName ? (
                <div className="p-3 space-y-2 text-[11px]" style={{ backgroundColor: '#f9fafb' }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div style={{ height: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span style={{ color: '#374151', fontWeight: 'bold', display: 'block', fontSize: '9.5px', lineHeight: '1.1' }}>
                        ÉTABLISSEMENT CHOISI (المؤسسة المختارة) :
                      </span>
                      <span style={{ fontWeight: 'bold', fontSize: '12.5px', lineHeight: '1.2' }}>{data.selectedSchoolName}</span>
                    </div>
                    <div style={{ height: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span style={{ color: '#374151', fontWeight: 'bold', display: 'block', fontSize: '9.5px', lineHeight: '1.1' }}>
                        VILLE RETENUE (المدينة) :
                      </span>
                      <span style={{ fontWeight: 'bold', fontSize: '12.5px', lineHeight: '1.2' }}>{data.selectedCity || 'Non spécifiée'}</span>
                    </div>
                  </div>

                  {data.selectedOption && (
                    <div className="pt-2" style={{ borderTop: '1px solid #e5e7eb', height: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span style={{ color: '#374151', fontWeight: 'bold', display: 'block', fontSize: '9.5px', lineHeight: '1.1' }}>
                        SPÉCIALITÉ / FILIÈRE DEMANDÉE (الشعبة والتخصص) :
                      </span>
                      <span style={{ fontWeight: 'bold', fontSize: '12.5px', lineHeight: '1.2' }}>{data.selectedOption}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontStyle: 'italic', fontSize: '11px' }}>
                  Aucun établissement sélectionné pour le moment.
                </div>
              )}
            </div>

            {/* Section 5: Cadre Officiel des Déclarations & Signatures */}
            <div className="p-3.5 space-y-3.5" style={{ border: '1px solid #000000', boxSizing: 'border-box' }}>
              <div className="text-[10px] leading-relaxed italic" style={{ color: '#1f2937', lineHeight: '1.35' }}>
                <p>
                  Je certifie sur l'honneur l'exactitude des informations fournies ci-dessus et la conformité de mes choix d'orientation scolaire et universitaire. Toute déclaration inexacte expose son auteur à l'annulation de sa candidature conformément à la réglementation en vigueur.
                </p>
                <p className="text-right mt-1" dir="rtl" style={{ fontWeight: '500' }}>
                  أشهد بصحة المعلومات المصرح بها أعلاه ومطابقة اختياراتي الأكاديمية، وأتحمل المسؤولية كاملة عن أي تصريح غير مطابق للحقيقة.
                </p>
              </div>

              {/* Fait à et Date */}
              <div
                className="flex justify-between items-center pt-2 text-[11px]"
                style={{ borderTop: '1px solid #d1d5db', color: '#374151', height: '24px', boxSizing: 'border-box', lineHeight: '1' }}
              >
                <div>
                  Fait à : <strong style={{ color: '#000000' }}>{data.ville || '........................'}</strong>
                </div>
                <div>
                  Le : <strong style={{ color: '#000000' }}>{data.dateCandidature}</strong>
                </div>
              </div>

              {/* Signatures & Cachet Area - FULLY VISIBLE & MATHEMATICALLY CENTERED */}
              <div
                className="grid grid-cols-3 gap-3.5 pt-3 items-stretch"
                style={{ borderTop: '1px solid #000000' }}
              >
                {/* Candidate Signature */}
                <div
                  style={{
                    backgroundColor: '#f9fafb',
                    border: '1px solid #d1d5db',
                    height: '136px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  <div style={{ height: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '10px', color: '#000000', lineHeight: '1.1' }}>
                      Signature du candidat
                    </p>
                    <span style={{ fontSize: '8px', color: '#6b7280', lineHeight: '1.1' }}>(توقيع التلميذ)</span>
                  </div>

                  <div style={{ height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {data.signatureEleve ? (
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src={data.signatureEleve}
                          alt="Signature élève"
                          style={{ maxHeight: '48px', maxWidth: '140px', objectFit: 'contain' }}
                        />
                        <span style={{ fontSize: '7.5px', color: '#047857', fontWeight: 'bold', lineHeight: '1', marginTop: '2px' }}>
                          ✓ Signé électroniquement
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '8.5px', color: '#9ca3af' }}>
                        [Cadre réservé à la signature]
                      </span>
                    )}
                  </div>

                  <div style={{ height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '8.5px', color: '#6b7280', lineHeight: '1' }}>
                      {data.nomPrenom || 'Le Candidat'}
                    </span>
                  </div>
                </div>

                {/* Official Administrative Stamp */}
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px dashed #93c5fd',
                    height: '136px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  <div style={{ height: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '9.5px', color: '#1e40af', lineHeight: '1.1' }}>
                      Cachet officiel d'enregistrement
                    </p>
                    <span style={{ fontSize: '8px', color: '#6b7280', lineHeight: '1.1' }}>(طابع المصادقة الإدارية)</span>
                  </div>

                  <div style={{ height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <OfficialLogo variant="stamp" size={62} />
                  </div>

                  <div style={{ height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '8px', color: '#1e40af', fontWeight: 'bold', lineHeight: '1' }}>
                      CONFORME • 2027-2028
                    </span>
                  </div>
                </div>

                {/* Guardian Signature */}
                <div
                  style={{
                    backgroundColor: '#f9fafb',
                    border: '1px solid #d1d5db',
                    height: '136px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  <div style={{ height: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '10px', color: '#000000', lineHeight: '1.1' }}>
                      Signature du tuteur légal
                    </p>
                    <span style={{ fontSize: '8px', color: '#6b7280', lineHeight: '1.1' }}>(توقيع وموافقة ولي الأمر)</span>
                  </div>

                  <div style={{ height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {data.signatureTuteur ? (
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src={data.signatureTuteur}
                          alt="Signature tuteur"
                          style={{ maxHeight: '48px', maxWidth: '140px', objectFit: 'contain' }}
                        />
                        <span style={{ fontSize: '7.5px', color: '#047857', fontWeight: 'bold', lineHeight: '1', marginTop: '2px' }}>
                          ✓ Signé électroniquement
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '8.5px', color: '#9ca3af' }}>
                        [Cadre réservé au tuteur légal]
                      </span>
                    )}
                  </div>

                  <div style={{ height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '8.5px', color: '#6b7280', lineHeight: '1' }}>
                      {data.tuteurType === 'pere'
                        ? data.nomPere || 'Le Père'
                        : data.tuteurType === 'mere'
                        ? data.nomMere || 'La Mère'
                        : data.nomTuteur || 'Le Tuteur Légal'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page 2 Footer */}
          <div
            className="pt-2 text-[8.5px] flex justify-between items-center"
            style={{ borderTop: '1px solid #e5e7eb', color: '#6b7280', height: '22px', boxSizing: 'border-box', lineHeight: '1' }}
          >
            <span>IKIPAS • Siège Tanger (Résidence 4 Temps) & Fès (Avenue Ibn Al Haytham) • contact@ikipas.com</span>
            <span>Document Certifié • Infoline : 0606799330 / 0700635666 / 0661862506 • {data.dateCandidature}</span>
          </div>
        </div>
      )}
    </div>
  );
};
