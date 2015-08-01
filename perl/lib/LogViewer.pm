# リクエストURI毎のステータスコード(status)の分布をグラフ化する
package LogViewer;
use strict;
use warnings;

sub new {
    my ($class, $logs) = @_;
    return bless { logs => $logs }, $class;
};

sub graph_bar {
  my $num = shift;
  # 数に応じて"="を伸ばしていき、バーの末尾はnumの第一位の数字を表示
  return  ($num == 0) ? "" : ("=" x ($num - 1) . ($num % 10));
  #return $num;
}

sub status_by_page {
  my $self = shift;
  my @logs = @{$self->{logs}};
  my $res = {};

  # LogCounter.pm と似た処理
  # reqごとにログをまとめる
  for my $log (@logs) {
    my $uri = (exists $log->{req}) ? (split / /, $log->{req})[1] : "unknown";
    if(not exists $res->{$uri}) {
      $res->{$uri} = {};
    }
    my $status = "s" . $log->{status};
    if(not exists $res->{$uri}->{$status}) {
      $res->{$uri}->{$status} = 0;
    }
    $res->{$uri}->{$status} += 1;
  }

  # 表示
  my @uris = sort keys $res;
  for my $uri (@uris) {
    print $uri . "\n";
    print "---:        10        20        30        40        50\n";
    my @st = sort keys $res->{$uri};
    for my $status (@st) {
      my $st_num = (split m/s/, $status)[1];
      print "$st_num:" . graph_bar($res->{$uri}->{$status}) . "\n";
    }
    print "\n";
  }
}

1;
