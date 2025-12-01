'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export function PrintView({ data, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  const renderSection = (title, items) => {
    const filteredItems = Object.entries(items).filter(
      ([key, value]) => value && value !== '' && !Array.isArray(value)
    );

    if (filteredItems.length === 0) return null;

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600">
          {title}
        </h3>
        <div className="grid grid-cols-2 gap-6">
          {filteredItems.map(([key, value]) => (
            <div key={key}>
              <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p className="text-sm text-slate-900 mt-1">{String(value)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Non-print header */}
      <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex gap-4 print:hidden">
        <Button
          onClick={onClose}
          variant="outline"
          className="gap-2"
        >
          <ChevronLeft size={20} />
          Back to Form
        </Button>
        <Button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Print
        </Button>
      </div>

      {/* Printable content */}
      <div className="p-12 max-w-4xl mx-auto print:p-0">
        {/* Header */}
        <div className="text-center mb-12 pb-8 border-b-2 border-slate-200">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {data.droneName || 'Drone Specification'}
          </h1>
          <div className="flex justify-center gap-8 text-slate-600">
            {data.country && <p className="font-medium">{data.country}</p>}
            {data.companyName && <p className="font-medium">{data.companyName}</p>}
          </div>
        </div>

        {/* Company Info */}
        {renderSection('Company Information', {
          'Company Name': data.companyName,
          'Country': data.country,
        })}

        {/* Drone Basic Info */}
        {renderSection('Drone Basic Information', {
          'Drone Name': data.droneName,
          'Drone Type': data.droneType?.join(', '),
          'Primary Mission': data.primaryMission?.join(', '),
        })}

        {/* Flight Performance */}
        {renderSection('Flight Performance', {
          'Max Range': data.maxRange,
          'Endurance': data.endurance,
          'Max Speed': data.maxSpeed,
          'Max Altitude': data.maxAltitude,
        })}

        {/* Weights & Dimensions */}
        {renderSection('Weights & Dimensions', {
          'Empty Weight': data.emptyWeight,
          'Payload Weight': data.payloadWeight,
          'Takeoff Weight': data.takeoffWeight,
          'Length': data.length,
          'Width': data.width,
        })}

        {/* Payload */}
        {renderSection('Payload', {
          'Max Payload': data.maxPayload,
          'Payload Type': data.payloadType?.join(', '),
        })}

        {/* Motor System */}
        {renderSection('Motor System', {
          'Motor Type': data.motorType?.join(', '),
          'Motor Count': data.motorCount,
        })}

        {/* Communication System */}
        {renderSection('Communication System', {
          'Communication Type': data.communicationType?.join(', '),
          'Encryption Type': data.encryptionType,
          'Control Link Range': data.controlLinkRange,
        })}

        {/* Navigation System */}
        {renderSection('Navigation System', {
          'GPS Type': data.gpsType?.join(', '),
          'INS Type': data.insType,
        })}

        {/* Anti-Jamming & Anti-Spoofing */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600">
            Anti-Jamming & Anti-Spoofing
          </h3>
          <div className="space-y-4">
            {data.antiGpsSpoofing && (
              <div>
                <p className="font-medium text-slate-900">Anti-GPS Spoofing</p>
                <p className="text-sm text-slate-600">{data.antiGpsSpoofingFeatures?.join(', ')}</p>
              </div>
            )}
            {data.antiGpsJamming && (
              <div>
                <p className="font-medium text-slate-900">Anti-GPS Jamming</p>
                <p className="text-sm text-slate-600">{data.antiGpsJammingFeatures?.join(', ')}</p>
              </div>
            )}
            {data.antiCommJamming && (
              <div>
                <p className="font-medium text-slate-900">Anti-Communication Link Jamming</p>
                <p className="text-sm text-slate-600">{data.antiCommJammingFeatures?.join(', ')}</p>
              </div>
            )}
            {data.antiInterference && (
              <div>
                <p className="font-medium text-slate-900">Anti-Signal Interference</p>
                <p className="text-sm text-slate-600">{data.antiInterferenceFeatures?.join(', ')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Extra Features */}
        {data.extraFeatures?.length > 0 && renderSection('Extra Features', {
          'Features': data.extraFeatures?.join(', '),
        })}

        {/* Global Notes */}
        {data.globalNotes && (
          <div className="mt-12 pt-8 border-t-2 border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">General Notes</h3>
            <p className="text-slate-700 whitespace-pre-wrap">{data.globalNotes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
