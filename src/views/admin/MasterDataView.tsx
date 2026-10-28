import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Plus, Search, CheckCircle2, MapPin } from 'lucide-react';

export const MasterDataView: React.FC = () => {
  const { applications } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const sampleInstitutions = [
    {
      id: 'inst-1',
      name: 'Rungta College of Engineering and Technology',
      aishe: 'C-12345',
      state: 'Chhattisgarh',
      district: 'Bhilai',
      category: 'Engineering / Technical',
      status: 'Active Regulatory Record',
    },
    {
      id: 'inst-2',
      name: 'Demo Institute B of Technology',
      aishe: 'C-88412',
      state: 'Maharashtra',
      district: 'Pune',
      category: 'New Institute / Degree',
      status: 'Active Regulatory Record',
    },
    {
      id: 'inst-3',
      name: 'Demo Institute A - Polytechnic',
      aishe: 'C-55219',
      state: 'Madhya Pradesh',
      district: 'Bhopal',
      category: 'Diploma / Polytechnic',
      status: 'Active Regulatory Record',
    },
    {
      id: 'inst-4',
      name: 'ABC Institute of Management & Science',
      aishe: 'C-33104',
      state: 'Karnataka',
      district: 'Bengaluru',
      category: 'Management (MBA/MCA)',
      status: 'Active Regulatory Record',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">System Administration</p>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-1">Master Data Registry</h1>
          <p className="text-xs text-slate-500">
            Approved technical institutions, regulatory categories, and geographical jurisdictions.
          </p>
        </div>

        <button
          onClick={() => alert('Add institution modal')}
          className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Institution</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleInstitutions.map((inst) => (
          <div key={inst.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{inst.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">AISHE Code: {inst.aishe}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{inst.district}, {inst.state}</span>
              </span>
              <span className="font-semibold text-blue-600">{inst.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
